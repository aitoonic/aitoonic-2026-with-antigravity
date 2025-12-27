'use server'

import { createClient } from '@/utils/supabase/server'
// import { sendMail } from './mailer' // Future integration

export interface ContactData {
    name: string;
    email: string;
    message: string;
}

export async function submitContactFormAction(data: ContactData) {
    // 1. Validation
    if (!data.name || !data.email || !data.message) {
        throw new Error('Missing required fields')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        throw new Error('Invalid email format')
    }

    // 2. Logic (simulate for now as per original route)
    // potentially verify user or rate limit here using server-side utilities

    // Future: await sendMail(...)

    return { success: true, message: 'Contact form submitted successfully' }
}
