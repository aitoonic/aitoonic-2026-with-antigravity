import { createBrowserClient } from '@supabase/ssr'
import { supabaseUrl, supabaseKey } from '@/lib/supabase'

export const createClient = () =>
    createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || supabaseUrl,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || supabaseKey
    )
