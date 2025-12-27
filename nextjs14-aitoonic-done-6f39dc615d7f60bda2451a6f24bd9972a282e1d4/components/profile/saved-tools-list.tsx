'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, Trash2 } from 'lucide-react'

type Tool = {
    id: string
    name: string
    slug: string
    short_description?: string
    description?: string
    image_url?: string
    seo_description?: string
}

export default function SavedToolsList({ userId, initialTools = [] }: { userId: string, initialTools?: Tool[] }) {
    const supabase = createClient()
    const [tools, setTools] = useState<Tool[]>(initialTools)
    // No loading state needed if data is provided from server
    const [loading, setLoading] = useState(false)

    // Effect only needed if we want to refresh, but for now we assume data is fresh from server nav
    // If you want real-time updates, you'd keep an effect or subscription. 
    // To minimize egress, we rely on the server validation.

    const removeTool = async (toolId: string) => {
        const { error } = await supabase
            .from('saved_tools')
            .delete()
            .match({ user_id: userId, tool_id: toolId })

        if (error) {
            alert('Error removing tool')
        } else {
            setTools(tools.filter(t => t.id !== toolId))
        }
    }

    if (loading) return <div className="flex justify-center p-4"><Loader2 className="animate-spin" /></div>

    if (tools.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground border rounded-lg bg-muted/20">
                <p>You haven't saved any tools yet.</p>
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

                    {/* Actions */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            removeTool(tool.id)
                        }}
                        className="relative z-10 p-1.5 text-muted-foreground/50 hover:text-red-500 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Remove from saved"
                    >
                        <Trash2 size={15} />
                    </button>
                </div>
            ))}
        </div>
    )
}
