'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export default function SaveToolButton({ toolId }: { toolId: string }) {
    const supabase = createClient()
    const [isSaved, setIsSaved] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(() => {
        const checkStatus = async () => {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            if (user) {
                const { data } = await supabase
                    .from('saved_tools')
                    .select('id')
                    .eq('user_id', user.id)
                    .eq('tool_id', toolId)
                    .single()

                setIsSaved(!!data)
            }
            setLoading(false)
        }

        checkStatus()
    }, [toolId])

    const toggleSave = async () => {
        if (!user) {
            router.push('/login?message=Please login to save tools')
            return
        }

        // Optimistic toggle
        const newState = !isSaved
        setIsSaved(newState)

        if (newState) {
            // Save
            const { error } = await supabase
                .from('saved_tools')
                .insert({ user_id: user.id, tool_id: toolId })

            if (error) {
                setIsSaved(!newState) // Revert on error
                console.error('Error saving tool', error)
            }
        } else {
            // Unsave
            const { error } = await supabase
                .from('saved_tools')
                .delete()
                .match({ user_id: user.id, tool_id: toolId })

            if (error) {
                setIsSaved(!newState) // Revert on error
                console.error('Error removing tool', error)
            }
        }
    }

    if (loading) {
        return <button disabled className="p-2 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /></button>
    }

    return (
        <button
            onClick={toggleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isSaved
                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
            title={isSaved ? "Saved" : "Save Tool"}
        >
            {isSaved ? <BookmarkCheck className="h-5 w-5 fill-current" /> : <Bookmark className="h-5 w-5" />}
            <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
        </button>
    )
}
