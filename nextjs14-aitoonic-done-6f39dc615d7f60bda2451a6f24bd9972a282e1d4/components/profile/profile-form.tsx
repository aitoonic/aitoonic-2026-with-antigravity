'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { Loader2 } from 'lucide-react'

export default function ProfileForm({ user }: { user: User | null }) {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null) // Display only usually
    const [phone, setPhone] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)
            if (!user) return

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`full_name, email, phone_number, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setFullname(data.full_name)
                setEmail(data.email)
                setPhone(data.phone_number)
                setAvatarUrl(data.avatar_url)
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
    }: {
        fullname: string | null
        phone: string | null
    }) {
        try {
            setLoading(true)
            setMessage(null)
            if (!user) return

            const updates = {
                id: user.id,
                full_name: fullname,
                phone_number: phone,
                updated_at: new Date().toISOString(),
            }

            const { error } = await supabase.from('profiles').upsert(updates)
            if (error) throw error
            setMessage('Profile updated successfully!')
        } catch (error) {
            setMessage('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow border border-border">
            <h2 className="text-2xl font-bold mb-6">User Profile</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input id="email" type="text" value={user?.email || ''} disabled className="w-full p-2 rounded border bg-muted text-muted-foreground" />
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
                        className="w-full p-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 flex justify-center items-center"
                        onClick={() => updateProfile({ fullname, phone })}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>

                {message && (
                    <div className={`p-3 rounded text-center text-sm ${message.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    )
}
