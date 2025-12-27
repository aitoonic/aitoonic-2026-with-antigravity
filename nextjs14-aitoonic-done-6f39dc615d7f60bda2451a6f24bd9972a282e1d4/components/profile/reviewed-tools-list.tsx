'use client'

import { useEffect, useState } from 'react'
import { getUserReviews } from '@/actions/review-actions'
import { Tool } from '@/lib/types'
import ToolCard from '@/components/ToolCard'
import { Loader2 } from 'lucide-react'
import StarRating from '../reviews/star-rating'

interface ReviewedToolsListProps {
    userId: string
}

type ReviewWithTool = {
    id: string
    rating: number
    comment: string
    tool: Tool
}

export default function ReviewedToolsList({ userId }: ReviewedToolsListProps) {
    const [reviews, setReviews] = useState<ReviewWithTool[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchReviews() {
            try {
                const data = await getUserReviews(userId)
                setReviews(data)
            } catch (error) {
                console.error('Failed to fetch user reviews', error)
            } finally {
                setLoading(false)
            }
        }

        if (userId) {
            fetchReviews()
        }
    }, [userId])

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No reviews yet. Start reviewing tools you use!
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="flex flex-col gap-3 group relative">
                        {/* We can reuse ToolCard but maybe we want to show the Review context too? 
                 Let's wrap the ToolCard and show the review below it or overlay.
                 Or just list the tools. The user said "same things whcih tools they give review and ration with also saved and rateup ok"
                 I'll render the ToolCard and append the user's review below it.
             */}

                        <ToolCard tool={review.tool} />

                        <div className="bg-muted/30 -mt-2 pt-4 pb-3 px-3 rounded-b-xl border-x border-b border-border/50 text-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Your Review</span>
                                <StarRating rating={review.rating} size={14} readOnly />
                            </div>
                            {review.comment && (
                                <p className="text-muted-foreground line-clamp-2 italic">"{review.comment}"</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
