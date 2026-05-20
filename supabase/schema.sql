-- Run this in the Supabase SQL Editor to create the leads table

create table if not exists leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamp with time zone default now(),
  name            text not null,
  email           text not null,
  whatsapp        text,
  current_role    text,
  result_path     text,
  builder_score   int,
  automation_score int,
  data_score      int,
  creative_score  int,
  growth_score    int,
  answers         jsonb,
  source          text default 'career_quiz'
);

-- Optional: index for common queries
create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_result_path_idx on leads (result_path);
create index if not exists leads_email_idx on leads (email);

-- Enable Row Level Security
alter table leads enable row level security;

-- Allow inserts from anon (the quiz frontend)
create policy "Allow anon insert" on leads
  for insert to anon
  with check (true);

-- Only service role can read (used by admin API with service role key)
create policy "Allow service role read" on leads
  for select to service_role
  using (true);
