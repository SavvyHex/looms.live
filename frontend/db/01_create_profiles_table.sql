-- Migration: create profiles table (linked to Supabase auth.users)
-- Run this in Supabase SQL editor or via your migration runner.

create table if not exists profiles (
  id uuid primary key references auth.users(id),
  username text unique not null,
  display_name text,
  bio text,
  created_at timestamptz default now()
);

create index if not exists profiles_username_idx on profiles (username);
