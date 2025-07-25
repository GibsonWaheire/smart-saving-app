import { createClient } from '@supabase/supabase-js'

// Simple environment variable detection
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug logging
console.log('Environment check:')
console.log('VITE_SUPABASE_URL:', supabaseUrl ? 'Found' : 'Missing')
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Found' : 'Missing')
console.log('All env vars:', Object.keys(import.meta.env).filter(key => key.includes('SUPABASE')))

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey) 