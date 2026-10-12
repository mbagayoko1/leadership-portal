// AI Coach proxy (Supabase Edge Function). Keeps the Anthropic API key on
// the server so the static site never ships it.
//
// Deploy:
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-... \
//     ALLOWED_ORIGINS=https://mbagayoko1.github.io,http://localhost:3005
//   supabase functions deploy ai-coach --no-verify-jwt
// Then build the site with
//   VITE_AI_PROXY_URL=https://<project-ref>.supabase.co/functions/v1/ai-coach
//
// NOT SAFE TO DEPLOY AS-IS. The Origin check is a CORS convenience, not
// authorization: any script can send a forged Origin header and spend the
// key's credit. The portal's own sign-in is browser-only, so there is no
// identity to verify here yet. Before deploying, move the portal to Supabase
// Auth, deploy WITHOUT --no-verify-jwt, reject requests whose JWT is not a
// signed-in user (supabase.auth.getUser), and add per-user quotas. Keep a
// monthly spend limit on the key in the Anthropic Console regardless.

const API_KEY = Deno.env.get("ANTHROPIC_API_KEY") ?? "";
const ALLOWED = (Deno.env.get("ALLOWED_ORIGINS") ?? "")
  .split(",").map((s) => s.trim()).filter(Boolean);

// Pinned server-side so callers cannot pick a pricier model or raise limits.
const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 16000;

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") ?? "";
  const allowed = ALLOWED.includes(origin);
  const cors: Record<string, string> = {
    "Access-Control-Allow-Origin": allowed ? origin : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Vary": "Origin",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: allowed ? 204 : 403, headers: cors });
  }
  if (!allowed) return new Response("Forbidden", { status: 403, headers: cors });
  if (req.method !== "POST" || !new URL(req.url).pathname.endsWith("/v1/messages")) {
    return new Response("Not found", { status: 404, headers: cors });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400, headers: cors });
  }

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: Math.min(Number(body.max_tokens) || 1024, MAX_TOKENS),
      system: body.system,
      messages: body.messages,
      stream: body.stream === true,
    }),
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { ...cors, "content-type": upstream.headers.get("content-type") ?? "application/json" },
  });
});
