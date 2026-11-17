-- Daily usage counter for the AI Coach proxy (supabase/functions/ai-coach).
-- One row per UTC day for the whole cohort. Only the service role (the edge
-- function) can read or write it: no policies are granted to anon.
create table if not exists ai_usage (
  day date primary key,
  requests integer not null default 0,
  input_tokens bigint not null default 0,
  output_tokens bigint not null default 0,
  updated_at timestamptz not null default now()
);

alter table ai_usage enable row level security;

create or replace function ai_usage_add(p_day date, p_requests integer, p_input bigint, p_output bigint)
returns void
language sql
security definer
set search_path = public
as $$
  insert into ai_usage (day, requests, input_tokens, output_tokens)
  values (p_day, p_requests, p_input, p_output)
  on conflict (day) do update set
    requests = ai_usage.requests + excluded.requests,
    input_tokens = ai_usage.input_tokens + excluded.input_tokens,
    output_tokens = ai_usage.output_tokens + excluded.output_tokens,
    updated_at = now();
$$;

revoke all on function ai_usage_add(date, integer, bigint, bigint) from public, anon, authenticated;
