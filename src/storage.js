// localStorage-backed replacement for the Claude-artifact window.storage API.
// Kept async so calling code's await flow is unchanged.
const PREFIX = "ldp_";

export async function loadUsers() {
  try {
    const v = localStorage.getItem(PREFIX + "portal_users");
    if (v) return JSON.parse(v);
  } catch (e) {}
  return null;
}
export async function saveUsers(u) {
  try { localStorage.setItem(PREFIX + "portal_users", JSON.stringify(u)); } catch (e) {}
}
export async function loadSession() {
  try {
    const v = localStorage.getItem(PREFIX + "portal_session");
    if (v) return JSON.parse(v);
  } catch (e) {}
  return null;
}
export async function saveSession(username) {
  try { localStorage.setItem(PREFIX + "portal_session", JSON.stringify({ username })); } catch (e) {}
}
export async function clearSession() {
  try { localStorage.removeItem(PREFIX + "portal_session"); } catch (e) {}
}

// Per-user persisted state (progress, sessions, goals, notes)
export function loadJSON(key, fallback) {
  try {
    const v = localStorage.getItem(PREFIX + key);
    if (v != null) return JSON.parse(v);
  } catch (e) {}
  return fallback;
}
export function saveJSON(key, value) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) {}
}
