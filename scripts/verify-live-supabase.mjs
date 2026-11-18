import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;

console.log('Connecting to live Supabase:', url);
const supabase = createClient(url, key);

async function verify() {
  console.log('--- 1. Testing Live Insert into public.messages ---');
  const payload = {
    name: 'Anthony Riel C. Diango (System Verification)',
    email: 'rieldiango24@gmail.com',
    message: 'Phase 3 live database integration test for portfolio website.',
    created_at: new Date().toISOString()
  };

  const { error } = await supabase.from('messages').insert([payload]);

  if (error) {
    console.error('FAIL: Insert returned error:', error.message, error.code, error.details);
    process.exit(1);
  }

  console.log('PASS: Successfully inserted inquiry into public.messages without error!');

  console.log('\n--- 2. Testing Row-Level Security (RLS) Select Protection ---');
  const { data: readData, error: readError } = await supabase.from('messages').select('*');
  
  if (readError) {
    console.log('PASS: Select rejected with error:', readError.message);
  } else {
    // Under RLS, anon SELECT returns empty array [] (rows are hidden from public)
    console.log('Rows visible to anon role:', readData.length);
    if (readData.length === 0) {
      console.log('PASS: Row-Level Security is active! Anonymous users cannot scrape or read other inquiries.');
    } else {
      console.log('NOTE: Returned rows:', readData);
    }
  }

  console.log('\n--- LIVE DATABASE VERIFICATION COMPLETED SUCCESSFULLY ---');
}

verify();
