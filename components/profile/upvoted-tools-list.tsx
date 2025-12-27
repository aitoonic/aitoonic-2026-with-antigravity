'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, ChevronsUp } from 'lucide-react'

type Tool = {
    id: string
    name: string
    slug: string
    short_description?: string
    description?: string
    seo_description?: string
    image_url?: string
}

export default function UpvotedToolsList({ userId }: { userId: string }) {
    const supabase = createClient()
    const [tools, setTools] = useState<Tool[]>([])
    const [loading, setLoading] = useState(true)

    const fetchUpvotedTools = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('tool_votes')
                .select('tool_id')
                .eq('user_id', userId)

            if (error) throw error

            if (data && data.length > 0) {
                const toolIds = data.map(item => item.tool_id)
                const { data: toolsData, error: toolsError } = await supabase
                    .from('tools')
                    .select('id, name, slug, image_url, seo_description, description')
                    .in('id', toolIds)

                if (toolsError) throw toolsError
                setTools(toolsData || [])
            } else {
                setTools([])
            }

        } catch (error) {
            console.error('Error fetching upvoted tools:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUpvotedTools()
    }, [userId])

    if (loading) return <div className="flex justify-center p-4"><Loader2 className="animate-spin" /></div>

    if (tools.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground border rounded-lg bg-muted/20">
                <p>You haven't upvoted any tools yet.</p>
                <Link href="/" className="text-primary hover:underline mt-2 inline-block">Browse Tools</Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
                <div key={tool.id} className="group relative flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                    {/* Image */}
                    <div className="relative w-12 h-12 flex-shrink-0 bg-muted rounded-md overflow-hidden border border-border/50">
                        {tool.image_url ? (
                            <img
                                src={tool.image_url}
                                alt={tool.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // @ts-ignore
                                    e.currentTarget.src = 'https://i.ibb.co/KjStWPgL/aitoonic-fevicon-2.webp'
                                }}
                            />
                        ) : (
                            <img
                                src="https://i.ibb.co/KjStWPgL/aitoonic-fevicon-2.webp"
                                alt={tool.name}
                                className="w-full h-full object-contain p-2 opacity-50"
                            />
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <Link href={`/ai/${tool.slug}`} className="block focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            <h3 className="text-sm font-semibold text-foreground truncate">{tool.name}</h3>
                            <p className="text-xs text-muted-foreground truncate">{tool.seo_description || tool.short_description || tool.description}</p>
                        </Link>
                    </div>

                    {/* Icon */}
                    <div className="relative z-10 p-1.5 text-orange-500 bg-orange-50 rounded-md opacity-80 group-hover:opacity-100 transition-opacity" title="Upvoted">
                        <ChevronsUp size={15} />
                    </div>
                </div>
            ))}
        </div>
    )
}
