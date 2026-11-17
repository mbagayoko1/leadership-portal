// AI Coach proxy (Supabase Edge Function). Keeps the Anthropic API key on the
// server so the static site never ships it. The portal is a public static
// site with browser-only sign-in, so the gate is a cohort access code that the
// mentor gives participants; it is never in the repo or the built site.
//
// Secrets (set with `supabase secrets set`, never commit them):
//   ANTHROPIC_API_KEY    the key, from the Anthropic Console
//   ACCESS_CODE          the cohort access code (any long phrase; rotate if it leaks)
//   ALLOWED_ORIGINS      comma-separated, e.g. https://mbagayoko1.github.io,http://localhost:3005
//   DAILY_REQUESTS       optional cap per UTC day for the whole cohort (default 400)
//   DAILY_OUTPUT_TOKENS  optional cap per UTC day (default 800000)
//   PER_MINUTE           optional requests per minute per caller address (default 8)
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected by Supabase and are
// used only to keep the daily usage counter (table ai_usage, see
// supabase/migrations). Deploy with `supabase functions deploy ai-coach
// --no-verify-jwt`: the access code is the gate, and the daily caps plus a
// monthly spend limit on the key in the Anthropic Console bound the cost if
// the code leaks.
//
// Routes (relative to the function URL):
//   POST /v1/check      validates the access code, spends nothing
//   POST /v1/messages   forwards to Anthropic with the model and limits pinned here

const API_KEY = Deno.env.get("ANTHROPIC_API_KEY") ?? "";
const ACCESS_CODE = (Deno.env.get("ACCESS_CODE") ?? "").trim();
const ALLOWED = (Deno.env.get("ALLOWED_ORIGINS") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
const DAILY_REQUESTS = Number(Deno.env.get("DAILY_REQUESTS")) || 400;
const DAILY_OUTPUT_TOKENS = Number(Deno.env.get("DAILY_OUTPUT_TOKENS")) || 800_000;
const PER_MINUTE = Number(Deno.env.get("PER_MINUTE")) || 8;
const SB_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

// Pinned server-side so callers cannot pick a pricier model or raise limits.
const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 8000;

const enc = new TextEncoder();
async function sameSecret(a: string, b: string): Promise<boolean> {
  // Compare digests so the comparison time does not depend on where they differ.
  const [x, y] = await Promise.all([a, b].map((s) => crypto.subtle.digest("SHA-256", enc.encode(s))));
  const u = new Uint8Array(x), v = new Uint8Array(y);
  let diff = a.length === b.length ? 0 : 1;
  for (let i = 0; i < u.length; i++) diff |= u[i] ^ v[i];
  return diff === 0;
}

// Best-effort per-address limiter; instances are short-lived, the daily cap
// below is the durable one.
const recent = new Map<string, number[]>();
function tooFast(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 60_000);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > PER_MINUTE;
}

const today = () => new Date().toISOString().slice(0, 10);
const sbHeaders = { apikey: SB_KEY, Authorization: "Bearer " + SB_KEY, "content-type": "application/json" };

async function usageToday(): Promise<{ requests: number; output_tokens: number } | null> {
  const r = await fetch(`${SB_URL}/rest/v1/ai_usage?day=eq.${today()}&select=requests,output_tokens`, { headers: sbHeaders });
  if (!r.ok) return null;
  const rows = await r.json();
  return rows[0] ?? { requests: 0, output_tokens: 0 };
}

async function recordUsage(inputTokens: number, outputTokens: number) {
  try {
    await fetch(`${SB_URL}/rest/v1/rpc/ai_usage_add`, {
      method: "POST", headers: sbHeaders,
      body: JSON.stringify({ p_day: today(), p_requests: 1, p_input: inputTokens, p_output: outputTokens }),
    });
  } catch (e) {
    console.error("usage not recorded", e);
  }
}

// Reads a copy of the SSE stream for the usage figures Anthropic sends.
async function countStream(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const dec = new TextDecoder();
  let buf = "", input = 0, output = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      try {
        const ev = JSON.parse(line.slice(5));
        if (ev.type === "message_start") input = ev.message?.usage?.input_tokens ?? 0;
        if (ev.type === "message_delta" && ev.usage?.output_tokens) output = ev.usage.output_tokens;
      } catch { /* partial or non-JSON line */ }
    }
  }
  await recordUsage(input, output);
}

const json = (status: number, body: unknown, cors: Record<string, string>) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "content-type": "application/json" } });
// Shaped like Anthropic's own error body so the SDK in the browser maps it to the right kind.
const apiError = (status: number, type: string, message: string, cors: Record<string, string>) =>
  json(status, { type: "error", error: { type, message } }, cors);

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") ?? "";
  const allowed = ALLOWED.includes(origin);
  const cors: Record<string, string> = {
    "Access-Control-Allow-Origin": allowed ? origin : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Vary": "Origin",
  };
  if (req.method === "OPTIONS") return new Response(null, { status: allowed ? 204 : 403, headers: cors });
  if (!allowed) return new Response("Forbidden", { status: 403, headers: cors });
  if (req.method !== "POST") return new Response("Not found", { status: 404, headers: cors });

  const path = new URL(req.url).pathname;
  const code = (req.headers.get("x-portal-code") ?? "").trim();
  if (!ACCESS_CODE || !API_KEY) return apiError(503, "api_error", "The AI Coach proxy is not configured yet.", cors);
  if (!code || !(await sameSecret(code, ACCESS_CODE))) {
    return apiError(401, "authentication_error", "Access code not accepted.", cors);
  }
  if (path.endsWith("/v1/check")) return new Response(null, { status: 204, headers: cors });
  if (!path.endsWith("/v1/messages")) return new Response("Not found", { status: 404, headers: cors });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (tooFast(ip)) return apiError(429, "rate_limit_error", "Too many requests from this connection. Wait a minute, then try again.", cors);

  const used = await usageToday();
  if (!used) return apiError(503, "api_error", "The AI Coach proxy cannot read its usage table. Apply the ai_usage migration.", cors);
  if (used.requests >= DAILY_REQUESTS || used.output_tokens >= DAILY_OUTPUT_TOKENS) {
    return apiError(429, "rate_limit_error", "The programme's AI budget for today is used up. It resets at midnight UTC.", cors);
  }

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return apiError(400, "invalid_request_error", "Invalid JSON", cors); }
  const stream = body.stream === true;

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: Math.min(Number(body.max_tokens) || 1024, MAX_TOKENS),
      system: body.system,
      messages: body.messages,
      stream,
    }),
  });

  const headers = { ...cors, "content-type": upstream.headers.get("content-type") ?? "application/json" };
  if (!upstream.ok || !upstream.body) {
    return new Response(upstream.body, { status: upstream.status, headers });
  }
  if (stream) {
    const [toClient, toCount] = upstream.body.tee();
    // deno-lint-ignore no-explicit-any
    const rt = (globalThis as any).EdgeRuntime;
    const counting = countStream(toCount);
    if (rt?.waitUntil) rt.waitUntil(counting); else counting.catch(() => {});
    return new Response(toClient, { status: 200, headers });
  }
  const text = await upstream.text();
  try {
    const u = JSON.parse(text).usage ?? {};
    await recordUsage(u.input_tokens ?? 0, u.output_tokens ?? 0);
  } catch { /* usage stays unrecorded for a malformed body */ }
  return new Response(text, { status: 200, headers });
});
