// AI access for the AI Coach and speech builder. Two ways to connect:
//  - proxy: VITE_AI_PROXY_URL is set at build time. The proxy holds the real
//    Anthropic key (see supabase/functions/ai-coach), so nothing secret ships
//    to the browser. Each person enters the cohort access code once; it is
//    kept in this browser and sent with every request. Use this for the cohort.
//  - key: no proxy configured; a user pastes their own Gemini or Anthropic API
//    key, kept in this browser only and sent straight to that provider. The
//    key's prefix decides the provider. Never put a key in this code: the
//    repository and the published site are public.
import Anthropic, {
  APIUserAbortError, APIConnectionError, AuthenticationError, PermissionDeniedError,
  RateLimitError, BadRequestError, InternalServerError
} from "@anthropic-ai/sdk";
import { GEMINI_MODELS, GeminiError, checkGeminiKey, geminiComplete, geminiStream } from "./geminiClient.js";

export const AI_MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 16000;
const PROXY_URL = import.meta.env.VITE_AI_PROXY_URL;
const KEY_STORE = "ldp_ai_key";
const CODE_STORE = "ldp_ai_code";
const GEMINI_MODEL_STORE = "ldp_ai_gemini_model";

let client = null;
let clientKey = null;

export function readKey() {
  try { return localStorage.getItem(KEY_STORE) || ""; } catch (e) { return ""; }
}

export function readCode() {
  try { return localStorage.getItem(CODE_STORE) || ""; } catch (e) { return ""; }
}

// proxy: cohort proxy with the access code entered; code: proxy configured but
// no access code yet; key: personal key; off: nothing connected.
export function aiMode() {
  if (PROXY_URL) return readCode() ? "proxy" : "code";
  return readKey() ? "key" : "off";
}

export const aiConnected = () => { const m = aiMode(); return m === "proxy" || m === "key"; };

const isAnthropicKey = key => /^sk-ant-/.test(key);

// "gemini", "anthropic", or null when nothing is connected.
export function aiProvider() {
  if (PROXY_URL) return "anthropic";
  const key = readKey();
  return key ? (isAnthropicKey(key) ? "anthropic" : "gemini") : null;
}

function geminiModel() {
  try { return localStorage.getItem(GEMINI_MODEL_STORE) || GEMINI_MODELS[0]; } catch (e) { return GEMINI_MODELS[0]; }
}

function makeClient(apiKey, code) {
  // The proxy ignores the placeholder key and substitutes its own; the access
  // code travels in a header the proxy checks.
  return PROXY_URL
    ? new Anthropic({ baseURL: PROXY_URL, apiKey: "proxy", dangerouslyAllowBrowser: true, defaultHeaders: { "x-portal-code": code } })
    : new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
}

function getClient() {
  if (PROXY_URL) {
    const code = readCode();
    if (!code) throw new Error("ai_not_configured");
    if (!client || clientKey !== code) { client = makeClient(null, code); clientKey = code; }
    return client;
  }
  const key = readKey();
  if (!key) throw new Error("ai_not_configured");
  if (!client || clientKey !== key) { client = makeClient(key); clientKey = key; }
  return client;
}

// Checks the key against the provider's Models API (no tokens spent), then stores it.
export async function connectWithKey(key) {
  const trimmed = key.trim();
  if (isAnthropicKey(trimmed)) {
    await makeClient(trimmed).models.retrieve(AI_MODEL);
  } else {
    const model = await checkGeminiKey(trimmed);
    try { localStorage.setItem(GEMINI_MODEL_STORE, model); } catch (e) {}
  }
  try { localStorage.setItem(KEY_STORE, trimmed); } catch (e) {}
  client = null;
}

export function disconnectKey() {
  try { localStorage.removeItem(KEY_STORE); localStorage.removeItem(GEMINI_MODEL_STORE); } catch (e) {}
  client = null;
}

// Checks the cohort access code with the proxy (spends nothing), then stores it.
export async function connectWithCode(code) {
  const trimmed = code.trim();
  let res;
  try {
    res = await fetch(PROXY_URL + "/v1/check", { method: "POST", headers: { "x-portal-code": trimmed } });
  } catch (e) {
    throw new Error("network");
  }
  if (res.status === 401) throw new Error("bad_code");
  if (!res.ok) { let m = ""; try { m = (await res.json()).error.message; } catch (e) {} throw new Error(m || "proxy_" + res.status); }
  try { localStorage.setItem(CODE_STORE, trimmed); } catch (e) {}
  client = null;
}

export function disconnectCode() {
  try { localStorage.removeItem(CODE_STORE); } catch (e) {}
  client = null;
}

// What went wrong, in terms a person can act on. The SDK has already retried
// rate limits, overloads and dropped connections twice before we see them.
//   not_connected | auth | billing | busy | network | refusal | other
export function aiErrorKind(e) {
  if (!e) return "other";
  if (e instanceof GeminiError) return e.kind;
  if (e.message === "ai_not_configured") return "not_connected";
  if (e.message === "bad_code") return "auth";
  if (e.message === "network") return "network";
  if (e.message === "refusal") return "refusal";
  if (e instanceof AuthenticationError || e instanceof PermissionDeniedError) return "auth";
  if (e instanceof BadRequestError && /credit balance/i.test(e.message)) return "billing";
  if (e instanceof RateLimitError || e instanceof InternalServerError) return "busy";
  if (e instanceof APIConnectionError) return "network";
  return "other";
}

// Google's own words when only the account owner can act on them, such as a
// billing or region problem. Empty for everything else.
export function aiErrorDetail(e) {
  return e instanceof GeminiError && (e.kind === "billing" || e.kind === "other") ? e.message : "";
}

// The coach module distinguishes a user-cancelled request by name.
function asAbort(e, signal) {
  if (e instanceof APIUserAbortError || (signal && signal.aborted)) {
    const ab = new Error("cancelled");
    ab.name = "AbortError";
    return ab;
  }
  return e;
}

function textOf(message) {
  if (message.stop_reason === "refusal") throw new Error("refusal");
  return message.content.filter(b => b.type === "text").map(b => b.text).join("\n").trim();
}

export async function aiComplete(system, messages, signal) {
  if (aiProvider() === "gemini") {
    try { return await geminiComplete(readKey(), geminiModel(), system, messages, signal); }
    catch (e) { throw asAbort(e, signal); }
  }
  try {
    const message = await getClient().messages.create(
      { model: AI_MODEL, max_tokens: MAX_TOKENS, system, messages },
      { signal }
    );
    return textOf(message);
  } catch (e) {
    throw asAbort(e, signal);
  }
}

export async function aiStream(system, messages, onDelta, signal) {
  if (aiProvider() === "gemini") {
    try { return await geminiStream(readKey(), geminiModel(), system, messages, onDelta, signal); }
    catch (e) { throw asAbort(e, signal); }
  }
  let full = "";
  try {
    const stream = getClient().messages.stream(
      { model: AI_MODEL, max_tokens: MAX_TOKENS, system, messages },
      { signal }
    );
    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        full += event.delta.text;
        onDelta(event.delta.text);
      }
    }
    textOf(await stream.finalMessage());
    return full;
  } catch (e) {
    throw asAbort(e, signal);
  }
}
