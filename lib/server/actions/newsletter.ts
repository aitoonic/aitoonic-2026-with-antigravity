'use server'

import { createClient } from '@/utils/supabase/server'

export async function subscribeNewsletterAction(email: string) {
    // 1. Validation
    if (!email) {
        throw new Error('Email is required')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format')
    }

    // 2. Logic (simulate for now)
    // const supabase = createClient()
    // await supabase.from('newsletter').insert({ email })

    return { success: true, message: 'Successfully subscribed to newsletter' }
}
