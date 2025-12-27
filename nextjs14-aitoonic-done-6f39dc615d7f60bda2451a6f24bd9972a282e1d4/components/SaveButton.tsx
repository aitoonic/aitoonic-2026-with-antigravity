'use client'

import { useState, useEffect } from 'react'
import { Bookmark } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/hooks/useAuth'

interface SaveButtonProps {
    toolId: string
    onAuthRequired: () => void
    className?: string
    showLabel?: boolean
}

export default function SaveButton({ toolId, onAuthRequired, className = '', showLabel = false }: SaveButtonProps) {
    const { user, loading: authLoading } = useAuth()
    const [saved, setSaved] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [showToast, setShowToast] = useState(false)

    const supabase = createClient()

    useEffect(() => {
        let mounted = true

        const checkSaved = async () => {
            if (authLoading) return // Wait for auth to load

            if (!user) {
                setSaved(false)
                setLoading(false)
                return
            }

            const { data, error } = await supabase
                .from('saved_tools')
                .select('id')
                .eq('tool_id', toolId)
                .eq('user_id', user.id)
                .maybeSingle()

            if (!mounted) return

            if (!error && data) {
                setSaved(true)
            } else {
                setSaved(false)
            }
            setLoading(false)
        }

        checkSaved()

        return () => { mounted = false }
    }, [toolId, user, authLoading])

    const handleSave = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (authLoading) return

        if (!user) {
            onAuthRequired()
            return
        }

        if (saving) return

        setSaving(true)
        const newSaved = !saved
        setSaved(newSaved) // Optimistic

        try {
            if (newSaved) {
                const { error } = await supabase
                    .from('saved_tools')
                    .insert({ tool_id: toolId, user_id: user.id })

                if (error) throw error
                setShowToast(true)
                setTimeout(() => setShowToast(false), 3000)
            } else {
                const { error } = await supabase
                    .from('saved_tools')
                    .delete()
                    .eq('tool_id', toolId)
                    .eq('user_id', user.id)

                if (error) throw error
            }
        } catch (err) {
            console.error('Error saving:', err)
            setSaved(!newSaved) // Revert
        } finally {
            setSaving(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            handleSave(e as any)
        }
    }

    return (
        <>
            <div
                role="button"
                tabIndex={0}
                onClick={handleSave}
                onKeyDown={handleKeyDown}
                title={saved ? "Unsave" : "Save tool"}
                className={`flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${saved
                    ? 'text-primary hover:bg-primary/10'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    } ${className}`}
            >
                <Bookmark
                    className={`transition-transform duration-300 ${saved ? 'fill-primary scale-110' : 'scale-100'
                        } ${showLabel ? 'w-5 h-5' : (className.includes('w-') ? '' : 'w-5 h-5')}`} // Default size if not overridden
                />
                {showLabel && (
                    <span className="ml-1.5">{saved ? 'Saved' : 'Save'}</span>
                )}
            </div>

            {showToast && (
                <div className="fixed bottom-4 right-4 z-50 bg-foreground text-background px-4 py-2 rounded-md shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <Bookmark className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">Tool saved to profile</span>
                </div>
            )}
        </>
    )
}
