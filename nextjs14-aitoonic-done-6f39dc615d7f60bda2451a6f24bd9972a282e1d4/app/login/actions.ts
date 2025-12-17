'use server'

import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'



export async function signInWithGoogle() {
    console.log('[Auth] signInWithGoogle called')
    const supabase = createClient()
    const origin = headers().get('origin')
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        console.error('[Auth] signInWithGoogle error:', error.message)
        return redirect('/login?message=Could not initiate Google Sign In')
    }

    if (data.url) {
        console.log('[Auth] Redirecting to Google:', data.url)
        return redirect(data.url)
    }
}

export async function signInWithPassword(formData: FormData) {
    console.log('[Auth] signInWithPassword called')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('[Auth] signInWithPassword error:', error.message)
        return { error: 'Could not authenticate user: ' + error.message }
    }

    console.log('[Auth] signInWithPassword success')
    return { success: true }
}

export async function signUp(formData: FormData) {
    console.log('[Auth] signUp called')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const full_name = formData.get('full_name') as string
    const phone = formData.get('phone') as string
    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${headers().get('origin')}/auth/callback`,
            data: {
                full_name: full_name,
                phone_number: phone,
            },
        },
    })

    if (error) {
        console.error('[Auth] signUp error:', error.message)
        return { error: 'Could not sign up user: ' + error.message }
    }

    // If Supabase returns a session, the user is automatically signed in (Email confirmation disabled)
    // OR it returned a session for another reason.
    if (data.session) {
        console.log('[Auth] signUp: Session created automatically')
        return { success: true }
    }

    console.log('[Auth] signUp success (verification required)')
    return { success: 'Check email to continue sign in process' }
}
