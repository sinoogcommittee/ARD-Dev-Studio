import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY?.trim();

/**
 * Validates whether a string is a valid HTTP/HTTPS URL
 */
function isValidHttpUrl(string) {
  if (!string) return false;
  try {
    const parsed = new URL(string);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Safe Supabase client initialization.
 * Returns null if Supabase environment variables are missing or invalid,
 * ensuring the application can gracefully fall back to direct contact links.
 */
function initSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  if (!isValidHttpUrl(supabaseUrl)) {
    return null;
  }

  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
    return null;
  }
}

export const supabase = initSupabase();
export const isSupabaseConfigured = supabase !== null;
