// Storage layer. Shared data (users, per-user progress/sessions/goals/notes)
// goes to Supabase when configured (see backend.js), otherwise localStorage.
// The signed-in session is always per-device localStorage.
// Remote failures fall back to the local copy so the app never bricks offline.
import { remoteEnabled, kvGet, kvSet } from "./backend.js";

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

// Per-user shared state (progress, sessions, goals, notes)
export async function loadJSON(key, fallback) { return sharedGet(key, fallback); }
export function saveJSON(key, value) { sharedSet(key, value); }
