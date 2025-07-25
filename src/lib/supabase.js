import { createClient } from '@supabase/supabase-js'

// Get environment variables with multiple fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
                   import.meta.env.SUPABASE_URL || 
                   import.meta.env.SUPABASE_DATABASE_URL

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
                       import.meta.env.SUPABASE_ANON_KEY

// Debug logging to help troubleshoot
console.log('Supabase URL found:', !!supabaseUrl)
console.log('Supabase Anon Key found:', !!supabaseAnonKey)

// Create a mock client if environment variables are missing
let supabase;
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Please set up your Supabase configuration.')
  console.warn('For local development: Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
  console.warn('For Netlify: Install the Supabase extension in your Netlify dashboard')
  
  // Create a mock client that shows helpful error messages
  supabase = {
    from: () => ({
      select: () => ({
        order: () => Promise.reject(new Error('Supabase not configured. Please set up your environment variables.'))
      }),
      insert: () => ({
        select: () => Promise.reject(new Error('Supabase not configured. Please set up your environment variables.'))
      }),
      update: () => ({
        select: () => Promise.reject(new Error('Supabase not configured. Please set up your environment variables.'))
      }),
      delete: () => Promise.reject(new Error('Supabase not configured. Please set up your environment variables.'))
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase }; 