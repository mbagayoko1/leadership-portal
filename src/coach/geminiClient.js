// Google Gemini for the AI Coach, through the native REST API. Uses the native
// endpoint because the "AQ." auth keys AI Studio now issues are not accepted on
// Google's OpenAI-compatible one. The key travels in a header, never in the URL.
const BASE = "https://generativelanguage.googleapis.com/v1beta";
const MAX_TOKENS = 16000;
const RETRY_MS = [800, 1600];
// How long to wait for Google to start answering before trying the next model.
// generateContent only responds once the whole answer is ready, so it gets longer.
const STREAM_WAIT_MS = 45000;
const COMPLETE_WAIT_MS = 120000;

// The stable model first, then the newer one, which is often at capacity.
// Gemini 2.5 models are being retired in December 2026, so they are left out.
export const GEMINI_MODELS = ["gemini-3.6-flash", "gemini-3.8-flash"];

// The model that last answered, tried first so one busy model doesn't slow every message.
let lastWorking = null;

// kind matches aiClient's aiErrorKind: auth | billing | busy | network | refusal | other
export class GeminiError extends Error {
  constructor(kind, message) {
    super(message);
    this.name = "GeminiError";
    this.kind = kind;
  }
}

async function errorFrom(res) {
  let info = {};
  try { info = (await res.json()).error || {}; } catch (e) {}
  const reasons = (info.details || []).map(d => d.reason).filter(Boolean);
  const message = info.message || "Gemini request failed (" + res.status + ")";
  if (res.status === 401 || reasons.includes("API_KEY_INVALID")) return new GeminiError("auth", message);
  // An ordinary 429 also says "check your plan and billing details", so a 429 only
  // counts as billing when it says the credit itself is gone.
  if ((res.status === 429 ? /prepay|credit/i : /billing|prepay|credit/i).test(message)) return new GeminiError("billing", message);
  if (res.status === 403) return new GeminiError("auth", message);
  if (res.status === 429 || res.status >= 500) return new GeminiError("busy", message);
  return new GeminiError("other", message);
}

async function request(url, key, body, signal, waitMs = STREAM_WAIT_MS) {
  for (let attempt = 0; ; attempt++) {
    // Stays linked after the headers arrive so cancelling still stops a running stream.
    const ctrl = new AbortController();
    if (signal) {
      if (signal.aborted) ctrl.abort();
      else signal.addEventListener("abort", () => ctrl.abort(), { once: true });
    }
    let timedOut = false;
    const timer = setTimeout(() => { timedOut = true; ctrl.abort(); }, waitMs);
    let res;
    try {
      res = await fetch(url, {
        method: body ? "POST" : "GET",
        headers: { "x-goog-api-key": key, ...(body ? { "Content-Type": "application/json" } : {}) },
        body: body ? JSON.stringify(body) : undefined,
        signal: ctrl.signal
      });
    } catch (e) {
      if (timedOut) throw new GeminiError("busy", "Gemini did not answer in time");
      if (e.name === "AbortError") throw e;
      throw new GeminiError("network", "Could not reach Gemini");
    } finally {
      clearTimeout(timer);
    }
    if (res.ok) return res;
    const err = await errorFrom(res);
    if (err.kind !== "busy" || attempt >= RETRY_MS.length) throw err;
    await new Promise(r => setTimeout(r, RETRY_MS[attempt]));
  }
}

// Sends to the preferred model, moving on when one is busy or missing for this key.
async function requestAnyModel(preferred, action, key, body, signal, waitMs) {
  const models = [...new Set([lastWorking, preferred, ...GEMINI_MODELS].filter(Boolean))];
  let failure;
  for (const model of models) {
    try {
      const res = await request(BASE + "/models/" + model + action, key, body, signal, waitMs);
      lastWorking = model;
      return res;
    } catch (e) {
      if (!(e instanceof GeminiError) || !(e.kind === "busy" || /not found/i.test(e.message))) throw e;
      failure = e;
    }
  }
  throw failure;
}

// Confirms the key works (no tokens spent) and returns the model to use.
export async function checkGeminiKey(key) {
  for (const model of GEMINI_MODELS) {
    try {
      await request(BASE + "/models/" + model, key);
      return model;
    } catch (e) {
      if (!/not found/i.test(e.message)) throw e; // a model missing from this key: try the next
    }
  }
  return GEMINI_MODELS[0];
}

function requestBody(system, messages) {
  return {
    systemInstruction: { parts: [{ text: system }] },
    contents: messages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: typeof m.content === "string" ? m.content : m.content.map(p => p.text || "").join("\n") }]
    })),
    generationConfig: { maxOutputTokens: MAX_TOKENS }
  };
}

// The visible text of one response chunk; model thoughts are left out.
function textOf(chunk) {
  const cand = (chunk.candidates || [])[0];
  return ((cand && cand.content && cand.content.parts) || []).filter(p => p.text && !p.thought).map(p => p.text).join("");
}

function blocked(chunk) {
  if (chunk.promptFeedback && chunk.promptFeedback.blockReason) return true;
  const cand = (chunk.candidates || [])[0];
  return !!cand && ["SAFETY", "PROHIBITED_CONTENT", "BLOCKLIST", "RECITATION", "SPII"].includes(cand.finishReason);
}

export async function geminiComplete(key, model, system, messages, signal) {
  const res = await requestAnyModel(model, ":generateContent", key, requestBody(system, messages), signal, COMPLETE_WAIT_MS);
  const chunk = await res.json();
  const text = textOf(chunk).trim();
  if (!text && blocked(chunk)) throw new GeminiError("refusal", "Gemini declined this request");
  if (!text) throw new GeminiError("other", "Gemini returned an empty answer");
  return text;
}

export async function geminiStream(key, model, system, messages, onDelta, signal) {
  const res = await requestAnyModel(model, ":streamGenerateContent?alt=sse", key, requestBody(system, messages), signal, STREAM_WAIT_MS);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "", full = "", refused = false;
  const line = raw => {
    if (!raw.startsWith("data:")) return;
    const data = raw.slice(5).trim();
    if (!data) return;
    const chunk = JSON.parse(data);
    if (chunk.error) throw new GeminiError("other", chunk.error.message || "Gemini stopped unexpectedly");
    if (blocked(chunk)) refused = true;
    const delta = textOf(chunk);
    if (delta) { full += delta; onDelta(delta); }
  };
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop(); // may be an incomplete line; wait for the next piece
    lines.forEach(line);
  }
  if (buffer) line(buffer);
  if (!full && refused) throw new GeminiError("refusal", "Gemini declined this request");
  if (!full) throw new GeminiError("other", "Gemini returned an empty answer");
  return full;
}
