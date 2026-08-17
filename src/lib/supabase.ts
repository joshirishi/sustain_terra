import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isConfigured = Boolean(url && key);

/**
 * Publishable key only. Content tables are public-read; the lead tables are
 * insert-only under RLS, so nothing here can read a submission back out.
 */
export const supabase = isConfigured
  ? createClient(url, key, { auth: { persistSession: false } })
  : null;
