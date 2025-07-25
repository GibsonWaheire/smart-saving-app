import { createClient } from '@supabase/supabase-js'

// For Netlify with Supabase extension
const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.SUPABASE_DATABASE_URL
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY

// Fallback for local development (if you set up .env manually)
const fallbackUrl = import.meta.env.VITE_SUPABASE_URL
const fallbackKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseAnonKey || fallbackKey
) 