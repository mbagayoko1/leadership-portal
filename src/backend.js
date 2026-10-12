// Optional Supabase backend. When VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// are set at build time, portal data (users, progress, sessions, goals, notes)
// is shared across devices through a single key/value table (see
// supabase/schema.sql). Without them the app runs entirely on localStorage.
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;
export const remoteEnabled = !!supabase;

const TABLE = "portal_kv";

export async function kvGet(k) {
  const { data, error } = await supabase.from(TABLE).select("value").eq("key", k).maybeSingle();
  if (error) throw error;
  return data ? data.value : null;
}

export async function kvSet(k, value) {
  const { error } = await supabase.from(TABLE).upsert({ key: k, value, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export async function kvDelete(k) {
  const { error } = await supabase.from(TABLE).delete().eq("key", k);
  if (error) throw error;
}

export async function kvListKeys(prefix) {
  const { data, error } = await supabase.from(TABLE).select("key").like("key", prefix + "%");
  if (error) throw error;
  return (data || []).map(r => r.key);
}
