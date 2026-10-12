// Claude access for the AI Coach. Two ways to connect:
//  - proxy: VITE_AI_PROXY_URL is set at build time. The proxy holds the real
//    API key (see supabase/functions/ai-coach), so nothing secret ships to
//    the browser. Use this for the cohort.
//  - key: no proxy configured; a user pastes their own Anthropic API key,
//    which is kept in this browser only and sent straight to Anthropic.
import Anthropic, { APIUserAbortError } from "@anthropic-ai/sdk";

export const AI_MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 16000;
const PROXY_URL = import.meta.env.VITE_AI_PROXY_URL;
const KEY_STORE = "ldp_ai_key";

let client = null;
let clientKey = null;

export function readKey() {
  try { return localStorage.getItem(KEY_STORE) || ""; } catch (e) { return ""; }
}

export function aiMode() {
  if (PROXY_URL) return "proxy";
  return readKey() ? "key" : "off";
}

function makeClient(apiKey) {
  // The proxy ignores the placeholder key and substitutes its own.
  return PROXY_URL
    ? new Anthropic({ baseURL: PROXY_URL, apiKey: "proxy", dangerouslyAllowBrowser: true })
    : new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
}

function getClient() {
  if (PROXY_URL) {
    if (!client) client = makeClient();
    return client;
  }
  const key = readKey();
  if (!key) throw new Error("ai_not_configured");
  if (!client || clientKey !== key) { client = makeClient(key); clientKey = key; }
  return client;
}

// Checks the key against the Models API (no tokens spent), then stores it.
export async function connectWithKey(key) {
  const trimmed = key.trim();
  await makeClient(trimmed).models.retrieve(AI_MODEL);
  try { localStorage.setItem(KEY_STORE, trimmed); } catch (e) {}
  client = null;
}

export function disconnectKey() {
  try { localStorage.removeItem(KEY_STORE); } catch (e) {}
  client = null;
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
