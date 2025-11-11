-- Migration: create verses table
-- Stores a 4-line verse as plain text. Application should enforce exactly 4 lines before insert.

create table if not exists verses (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references profiles(id) on delete cascade,
  prompt_text text not null,
  content text not null,
  -- convenience generated column that splits content into lines
  lines text[] generated always as (string_to_array(content, E'\n')) stored,
  created_at timestamptz default now()
);

create index if not exists verses_author_created_idx on verses (author_id, created_at desc);
