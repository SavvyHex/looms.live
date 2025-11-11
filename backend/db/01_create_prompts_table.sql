-- Migration: create prompts table with a prompt_day column
-- This creates the prompts table if it doesn't exist and adds a prompt_day (date)
-- Use in Supabase SQL editor or via psql against your project's database.

create table if not exists prompts (
  id uuid primary key default gen_random_uuid(),
  prompt_text text not null,
  prompt_day date not null,
);

-- Optional: avoid exact duplicate prompt for the same day
create unique index if not exists prompts_prompt_text_day_idx on prompts (prompt_text, prompt_day);
