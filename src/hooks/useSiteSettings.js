import { useState, useEffect, useCallback } from 'react';
import { profile } from '../data/profile';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Custom hook to manage dynamic availability status and site settings
 * Falls back safely to profile.identity.availability when offline or unconfigured.
 */
export function useSiteSettings() {
  const [currentStatus, setCurrentStatus] = useState(profile.identity.availability);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch live status from Supabase on mount
  const fetchStatus = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('value, updated_at')
        .eq('key', 'current_status')
        .maybeSingle();

      if (!error && data?.value) {
        setCurrentStatus(data.value);
        setLastUpdated(data.updated_at);
      }
    } catch (err) {
      console.warn('Unable to load dynamic site settings from Supabase:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Update status in Supabase (authenticated action)
  const updateStatus = useCallback(async (newStatus) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Update profile.js instead.');
    }

    const trimmed = newStatus.trim();
    if (!trimmed) {
      throw new Error('Status cannot be empty.');
    }

    const { error } = await supabase
      .from('site_settings')
      .upsert({
        key: 'current_status',
        value: trimmed,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (error) {
      throw error;
    }

    // Immediately update local state so changes reflect instantly
    setCurrentStatus(trimmed);
    setLastUpdated(new Date().toISOString());
    return true;
  }, []);

  return {
    currentStatus,
    updateStatus,
    refreshStatus: fetchStatus,
    isLoading,
    lastUpdated
  };
}
