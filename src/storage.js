// Storage layer. Shared data (users, per-user progress/sessions/goals/notes)
// goes to Supabase when configured (see backend.js), otherwise localStorage.
// The signed-in session is always per-device localStorage.
// Remote failures fall back to the local copy so the app never bricks offline.
import { remoteEnabled, kvGet, kvSet, kvDelete, kvListKeys } from "./backend.js";

const PREFIX = "ldp_";

function localGet(key, fallback = null) {
  try {
    const v = localStorage.getItem(PREFIX + key);
    if (v != null) return JSON.parse(v);
  } catch (e) {}
  return fallback;
}
function localSet(key, value) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) {}
}

async function sharedGet(key, fallback = null) {
  if (remoteEnabled) {
    try {
      const v = await kvGet(key);
      if (v != null) { localSet(key, v); return v; }
      return fallback;
    } catch (e) {
      console.warn("Supabase read failed for " + key + "; using local copy.", e);
      return localGet(key, fallback);
    }
  }
  return localGet(key, fallback);
}
async function sharedSet(key, value) {
  localSet(key, value);
  if (remoteEnabled) {
    try { await kvSet(key, value); } catch (e) { console.warn("Supabase write failed for " + key, e); }
  }
}

// Shared user directory
export async function loadUsers() { return sharedGet("portal_users"); }
export async function saveUsers(u) { return sharedSet("portal_users", u); }

// Per-device session
export async function loadSession() { return localGet("portal_session"); }
export async function saveSession(username) { localSet("portal_session", { username }); }
export async function clearSession() {
  try { localStorage.removeItem(PREFIX + "portal_session"); } catch (e) {}
}

// Moves one account's per-user data to another username, without
// overwriting anything the new account already has. Local data only.
const USER_PREFIXES = ["prog_", "sessions_", "goals_", "notes_", "coach:", "coachplan:", "speechdrafts_"];

export function moveUserData(from, to) {
  USER_PREFIXES.forEach(p => {
    const a = PREFIX + p + from, b = PREFIX + p + to;
    try {
      const v = localStorage.getItem(a);
      if (v != null && localStorage.getItem(b) == null) localStorage.setItem(b, v);
      localStorage.removeItem(a);
    } catch (e) {}
  });
}

// Per-user shared state (progress, sessions, goals, notes)
export async function loadJSON(key, fallback) { return sharedGet(key, fallback); }
export function saveJSON(key, value) { sharedSet(key, value); }

// Generic access for the AI Coach module. `shared` data may sync to Supabase;
// private data never leaves this browser.
export async function storeGet(key, shared) {
  return shared ? sharedGet(key) : localGet(key);
}
export async function storeSet(key, value, shared) {
  if (!shared) { localSet(key, value); return localGet(key) != null; }
  localSet(key, value);
  if (!remoteEnabled) return true;
  try { await kvSet(key, value); return true; } catch (e) { console.warn("Supabase write failed for " + key, e); return false; }
}
export async function storeDelete(key, shared) {
  try { localStorage.removeItem(PREFIX + key); } catch (e) {}
  if (shared && remoteEnabled) {
    try { await kvDelete(key); } catch (e) { console.warn("Supabase delete failed for " + key, e); }
  }
}
export async function storeListKeys(prefix, shared) {
  if (shared && remoteEnabled) return kvListKeys(prefix);
  const out = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX + prefix)) out.push(k.slice(PREFIX.length));
    }
  } catch (e) {}
  return out;
}

// Removes everything stored for a user (used when an admin deletes the account).
export function deleteUserData(username) {
  USER_PREFIXES.forEach(p => { try { localStorage.removeItem(PREFIX + p + username); } catch (e) {} });
}
