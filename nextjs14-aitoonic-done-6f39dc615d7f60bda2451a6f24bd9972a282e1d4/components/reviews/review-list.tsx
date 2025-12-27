'use client'

import { ReviewWithUser } from '@/actions/review-actions'
import StarRating from './star-rating'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReviewListProps {
    reviews: ReviewWithUser[]
}

function timeAgo(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + ' years ago'
    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + ' months ago'
    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + ' days ago'
    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + ' hours ago'
    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + ' minutes ago'
    return Math.floor(seconds) + ' seconds ago'
}

export default function ReviewList({ reviews }: ReviewListProps) {
    if (reviews.length === 0) {
        return (
            <div className="text-center py-16 text-muted-foreground bg-secondary/10 rounded-xl border border-dashed border-border/60">
                <p className="text-lg font-medium text-foreground/80 mb-1">No reviews yet</p>
                <p className="text-sm">Be the first to share your experience!</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {reviews.map((review, index) => (
                <div
                    key={review.id}
                    className={cn(
                        "group flex gap-4 p-5 rounded-xl bg-card border shadow-sm transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500",
                        // Highlight high ratings
                        review.rating === 5 && "border-amber-500/20 bg-amber-500/5"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary ring-2 ring-background">
                            {review.user?.avatar_url ? (
                                <Image
                                    src={review.user.avatar_url}
                                    alt={review.user.full_name || 'User'}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full grid place-items-center text-secondary-foreground font-medium uppercase text-sm">
                                    {(review.user?.full_name || 'U').charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-sm text-foreground">
                                        {review.user?.full_name || 'Anonymous User'}
                                    </h4>
                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-medium border border-emerald-500/20">
                                        <CheckCircle2 size={10} /> Verified
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 mt-1">
                                    <StarRating rating={review.rating} size={14} readOnly />
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <span className="text-xs text-muted-foreground">
                                        {timeAgo(review.created_at)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {review.comment && (
                            <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                                {review.comment}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
