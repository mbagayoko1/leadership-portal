-- Leadership Development Portal — shared storage table.
-- Run this once in the Supabase SQL editor of your project.
create table if not exists portal_kv (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table portal_kv enable row level security;

-- The portal is a cohort-internal tool authenticated at the application
-- level, so the anon key may read and write this table. Anyone holding the
-- anon key can access the data — do not store sensitive information here,
-- and move to Supabase Auth + per-user policies for a hardened deployment.
create policy "portal read" on portal_kv for select to anon using (true);
create policy "portal insert" on portal_kv for insert to anon with check (true);
create policy "portal update" on portal_kv for update to anon using (true);
-- Needed when a participant stops sharing their AI Coach growth plan.
create policy "portal delete" on portal_kv for delete to anon using (key like 'coachplan:%');
