'use client'

import { useState, useEffect } from 'react'
import { ChevronsUp } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/hooks/useAuth'

interface VoteButtonProps {
    toolId: string
    initialCount?: number // If we have it from parent
    onAuthRequired: () => void
    className?: string
}

export default function VoteButton({ toolId, initialCount = 0, onAuthRequired, className = '' }: VoteButtonProps) {
    const { user } = useAuth()
    const [count, setCount] = useState(initialCount)
    const [hasVoted, setHasVoted] = useState(false)
    const [loading, setLoading] = useState(true)
    const [voting, setVoting] = useState(false)

    const supabase = createClient()

    // Fetch initial state
    useEffect(() => {
        let mounted = true

        const fetchData = async () => {
            // 1. Get total votes
            const { count: totalVotes, error: countError } = await supabase
                .from('tool_votes')
                .select('*', { count: 'exact', head: true })
                .eq('tool_id', toolId)

            if (!mounted) return

            if (!countError) {
                setCount(totalVotes || 0)
            }

            // 2. Check if user voted (only if logged in)
            if (user) {
                const { data, error: voteError } = await supabase
                    .from('tool_votes')
                    .select('id')
                    .eq('tool_id', toolId)
                    .eq('user_id', user.id)
                    .maybeSingle()

                if (!mounted) return

                if (!voteError && data) {
                    setHasVoted(true)
                } else {
                    setHasVoted(false)
                }
            }

            setLoading(false)
        }

        fetchData()

        return () => { mounted = false }
    }, [toolId, user])

    // Real-time subscription for vote count
    useEffect(() => {
        const channel = supabase
            .channel(`tool_votes_${toolId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'tool_votes',
                    filter: `tool_id=eq.${toolId}`,
                },
                (payload) => {
                    // When any change happens (INSERT/DELETE for this tool), refetch count
                    // We could also just increment/decrement based on payload, but refetching is safer for accuracy
                    const fetchCount = async () => {
                        const { count: totalVotes } = await supabase
                            .from('tool_votes')
                            .select('*', { count: 'exact', head: true })
                            .eq('tool_id', toolId)

                        if (totalVotes !== null) {
                            setCount(totalVotes)
                        }
                    }
                    fetchCount()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [toolId])


    const handleVote = async (e: React.MouseEvent) => {
        e.preventDefault() // Prevent parent Link click
        e.stopPropagation()

        console.log('VoteButton clicked. User:', user)

        if (!user) {
            console.log('User is null, triggering onAuthRequired')
            onAuthRequired()
            return
        }

        if (voting) return

        setVoting(true)

        // Optimistic update
        const newHasVoted = !hasVoted
        // We defer count update to subscription or manual fetch mostly, but for immediate feedback we can toggle
        // However, since we have realtime sub, maybe we rely on that? 
        // Better to be optimistic for "hasVoted" state at least.
        setHasVoted(newHasVoted)

        try {
            if (newHasVoted) {
                // Vote
                const { error } = await supabase
                    .from('tool_votes')
                    .insert({ tool_id: toolId, user_id: user.id })

                if (error) throw error
            } else {
                // Remove vote
                const { error } = await supabase
                    .from('tool_votes')
                    .delete()
                    .eq('tool_id', toolId)
                    .eq('user_id', user.id)

                if (error) throw error
            }
        } catch (err) {
            console.error('Error voting:', err)
            // Revert optimism
            setHasVoted(!newHasVoted)
        } finally {
            setVoting(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            handleVote(e as any)
        }
    }

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={handleVote}
            onKeyDown={handleKeyDown}
            className={`group flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-all duration-300 border cursor-pointer select-none ${hasVoted
                ? 'bg-orange-500/10 border-orange-500/30 text-orange-500'
                : 'bg-card border-border text-muted-foreground hover:bg-accent hover:text-foreground'
                } ${className}`}
            title={hasVoted ? "Remove rank up" : "Rank up"}
        >
            <ChevronsUp
                className={`w-5 h-5 transition-all duration-300 ${hasVoted ? 'stroke-orange-500 scale-110' : 'group-hover:-translate-y-0.5'
                    }`}
            />
            <span className="text-sm font-bold tabular-nums leading-none">
                {count}
            </span>
            <span className="text-xs font-medium opacity-70">
                Rank Up
            </span>
        </div>
    )
}
