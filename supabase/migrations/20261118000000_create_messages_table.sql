-- ============================================================================
-- Supabase Migration: Create Messages Table with Row-Level Security (RLS)
-- Phase 3 Deliverable for Anthony Riel C. Diango Portfolio
-- ============================================================================

-- 1. Create the messages table
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0 and length(name) <= 120),
  email text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  message text not null check (length(trim(message)) >= 10 and length(message) <= 3000),
  status text not null default 'new' check (status in ('new', 'read', 'archived', 'replied')),
  created_at timestamptz not null default now()
);

-- Comment on table and columns for documentation
comment on table public.messages is 'Contact form submissions and inquiries from the portfolio website.';
comment on column public.messages.id is 'Unique message identifier.';
comment on column public.messages.name is 'Name of the prospective client or employer submitting inquiry.';
comment on column public.messages.email is 'Contact email address of the submitter.';
comment on column public.messages.message is 'Inquiry description, project requirements, or role details.';
comment on column public.messages.status is 'Internal triage status (new, read, archived, replied).';
comment on column public.messages.created_at is 'Timestamp when the inquiry was submitted.';

-- 2. Performance indexes
create index if not exists idx_messages_created_at on public.messages (created_at desc);
create index if not exists idx_messages_status on public.messages (status);

-- 3. Enable Row-Level Security (RLS) - Mandatory
alter table public.messages enable row level security;

-- 4. RLS Policy: Allow anonymous and authenticated visitors to submit messages
-- Public visitors can INSERT their own inquiries, but CANNOT read, modify, or delete any rows.
create policy "Allow public visitors to insert contact inquiries"
  on public.messages
  for insert
  to anon, authenticated
  with check (true);

-- 5. RLS Policy: Allow authenticated admin users to read inquiries
create policy "Allow authenticated admin users to view inquiries"
  on public.messages
  for select
  to authenticated
  using (auth.role() = 'authenticated');

-- 6. RLS Policy: Allow authenticated admin users to update inquiry status
create policy "Allow authenticated admin users to update inquiry status"
  on public.messages
  for update
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 7. RLS Policy: Allow authenticated admin users to delete inquiries
create policy "Allow authenticated admin users to delete inquiries"
  on public.messages
  for delete
  to authenticated
  using (auth.role() = 'authenticated');
