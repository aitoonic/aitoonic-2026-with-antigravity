'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { Loader2 } from 'lucide-react'
import AvatarUpload from './avatar-upload'
import { useRouter } from 'next/navigation'

export default function ProfileForm({ user }: { user: User | null }) {
    const supabase = createClient()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [phone, setPhone] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)
            if (!user) return

            const { data, error, status } = await supabase
                .from('users') // Changed from 'profiles' to 'users' based on schema
                .select(`full_name, email, phone, avatar_url`) // phone_number -> phone based on schema
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                // Try fallback to metadata if table is empty/error
                setFullname(user.user_metadata?.full_name || null)
                setAvatarUrl(user.user_metadata?.avatar_url || null)
                setPhone(user.user_metadata?.phone || null)
            }

            if (data) {
                setFullname(data.full_name)
                setEmail(data.email || user.email)
                setPhone(data.phone)
                setAvatarUrl(data.avatar_url)
            } else {
                setEmail(user.email || null)
            }
        } catch (error) {
            console.log('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    async function updateProfile({
        fullname,
        phone,
        avatarUrl
    }: {
        fullname: string | null
        phone: string | null
        avatarUrl: string | null
    }) {
        try {
            setLoading(true)
            setMessage(null)
            if (!user) return

            const updates = {
                id: user.id,
                full_name: fullname,
                phone: phone, // Changed from phone_number to phone
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString(),
            }

            // 1. Update public table
            const { error } = await supabase.from('users').upsert(updates) // Changed from 'profiles'
            if (error) throw error

            // 2. Update Auth Metadata (so Header updates immediately)
            const { error: authError } = await supabase.auth.updateUser({
                data: {
                    full_name: fullname,
                    avatar_url: avatarUrl,
                    phone: phone
                }
            })
            if (authError) throw authError

            setMessage('Profile updated successfully!')
            router.refresh() // Refresh server components
        } catch (error) {
            setMessage('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow border border-border">
            <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>

            {user && (
                <AvatarUpload
                    uid={user.id}
                    url={avatar_url}
                    onUpload={(url) => {
                        setAvatarUrl(url)
                        updateProfile({ fullname, phone, avatarUrl: url })
                    }}
                />
            )}

            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input id="email" type="text" value={email || ''} disabled className="w-full p-2 rounded border bg-muted text-muted-foreground" />
                </div>
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullname || ''}
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full p-2 rounded border bg-background"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                        id="phone"
                        type="text"
                        value={phone || ''}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 rounded border bg-background"
                    />
                </div>

                <div className="pt-4">
                    <button
                        className="w-full p-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 flex justify-center items-center font-medium transition-colors"
                        onClick={() => updateProfile({ fullname, phone, avatarUrl: avatar_url })}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {loading ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                </div>

                {message && (
                    <div className={`p-3 rounded text-center text-sm ${message.includes('Error') ? 'bg-red-100/50 text-red-600 border border-red-200' : 'bg-green-100/50 text-emerald-600 border border-green-200'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    )
}
