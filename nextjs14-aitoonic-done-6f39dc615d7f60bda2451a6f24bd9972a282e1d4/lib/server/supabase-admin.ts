import { createClient } from '@supabase/supabase-js'
import { supabaseUrl } from '@/lib/supabase'

// Accessing the service role key from environment variables
// This environment variable MUST be set in .env.local and NEVER exposed to the client
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!serviceRoleKey) {
    // Warn in development, but this should be critical in production
    if (process.env.NODE_ENV === 'production') {
        console.error('CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing in production environment.')
    }
}

// Create a Supabase client with the service role key
// This client has admin privileges and bypasses RLS policies
export const adminAuthClient = serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : null

export const getAdminClient = () => {
    if (!adminAuthClient) {
        throw new Error('Supabase Service Role Key is not configured')
    }
    return adminAuthClient
}
