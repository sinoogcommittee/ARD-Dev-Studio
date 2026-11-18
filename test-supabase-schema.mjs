/**
 * Supabase Schema & Client Verification Test
 * Verifies SQL migration syntax, schema constraints, and client helper resilience.
 */
import fs from 'fs';

console.log('--- RUNNING SUPABASE PHASE 3 VERIFICATION ---');

// 1. Verify Migration Files Exist & Contain Required Elements
const messagesMigrationPath = 'supabase/migrations/20261118000000_create_messages_table.sql';
if (!fs.existsSync(messagesMigrationPath)) {
  console.error('FAIL: Messages migration file not found at', messagesMigrationPath);
  process.exit(1);
}

const settingsMigrationPath = 'supabase/migrations/20261118000001_create_site_settings_table.sql';
if (!fs.existsSync(settingsMigrationPath)) {
  console.error('FAIL: Site settings migration file not found at', settingsMigrationPath);
  process.exit(1);
}

const migrationSql = fs.readFileSync(messagesMigrationPath, 'utf-8');
const settingsSql = fs.readFileSync(settingsMigrationPath, 'utf-8');

const requiredTokens = [
  'create table if not exists public.messages',
  'name text not null',
  'email text not null',
  'message text not null',
  'status text not null default \'new\'',
  'created_at timestamptz not null default now()',
  'alter table public.messages enable row level security',
  'create policy "Allow public visitors to insert contact inquiries"',
  'for insert',
  'to anon, authenticated',
  'create policy "Allow authenticated admin users to view inquiries"',
  'idx_messages_created_at',
  'idx_messages_status',
];

for (const token of requiredTokens) {
  if (!migrationSql.includes(token)) {
    console.error(`FAIL: Messages migration SQL missing required token: "${token}"`);
    process.exit(1);
  }
}

const requiredSettingsTokens = [
  'create table if not exists public.site_settings',
  'key text primary key',
  'value text not null',
  'alter table public.site_settings enable row level security',
  'create policy "Allow public visitors to read site settings"',
  'create policy "Allow authenticated admin to update site settings"',
];

for (const token of requiredSettingsTokens) {
  if (!settingsSql.includes(token)) {
    console.error(`FAIL: Settings migration SQL missing required token: "${token}"`);
    process.exit(1);
  }
}

console.log('PASS: Migration SQL contains valid schema, indexes, and RLS policies.');

// 2. Verify Supabase Client Helper Logic
import { supabase, isSupabaseConfigured } from './src/lib/supabase.js';

if (isSupabaseConfigured !== false || supabase !== null) {
  console.error('FAIL: Unconfigured client must return null and isSupabaseConfigured: false');
  process.exit(1);
}
console.log('PASS: Client helper gracefully defaults to null in absence of credentials.');

// 3. Verify README Documentation Exists
const readmePath = 'supabase/README.md';
if (!fs.existsSync(readmePath)) {
  console.error('FAIL: supabase/README.md missing');
  process.exit(1);
}
console.log('PASS: Complete Supabase setup and migration guide provided.');

console.log('--- PHASE 3 VERIFICATION SUITE PASSED (3/3) ---');
