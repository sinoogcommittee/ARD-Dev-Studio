-- ============================================================================
-- Supabase Migration: Create Site Settings Table with Row-Level Security (RLS)
-- Dynamic configuration management for ARD Dev Studio (Anthony Riel C. Diango)
-- ============================================================================

-- 1. Create the site_settings table
create table if not exists public.site_settings (
  key text primary key check (length(trim(key)) > 0 and length(key) <= 60),
  value text not null check (length(value) <= 1000),
  updated_at timestamptz not null default now()
);

-- Documentation comments
comment on table public.site_settings is 'Dynamic key-value settings for the portfolio, including live availability status.';
comment on column public.site_settings.key is 'Unique setting identifier key (e.g. current_status).';
comment on column public.site_settings.value is 'Setting string value.';
comment on column public.site_settings.updated_at is 'Timestamp when the setting was last modified.';

-- 2. Seed initial current status
insert into public.site_settings (key, value)
values (
  'current_status',
  'Project-based, freelance, part-time, or full-time remote roles'
)
on conflict (key) do nothing;

-- 3. Enable Row-Level Security (RLS)
alter table public.site_settings enable row level security;

-- 4. RLS Policy: Allow public to read site settings
-- Public visitors need to read the live availability status on page load.
create policy "Allow public visitors to read site settings"
  on public.site_settings
  for select
  to anon, authenticated
  using (true);

-- 5. RLS Policy: Allow authenticated admin to update site settings
-- Only Anthony when authenticated can change settings.
create policy "Allow authenticated admin to update site settings"
  on public.site_settings
  for update
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 6. RLS Policy: Allow authenticated admin to insert new site settings
create policy "Allow authenticated admin to insert site settings"
  on public.site_settings
  for insert
  to authenticated
  with check (auth.role() = 'authenticated');
