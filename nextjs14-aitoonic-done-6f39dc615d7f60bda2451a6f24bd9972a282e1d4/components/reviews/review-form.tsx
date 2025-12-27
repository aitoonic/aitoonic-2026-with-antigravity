'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import StarRating from './star-rating'
import { submitReview, getUserReviewForTool } from '@/actions/review-actions'
import { Loader2 } from 'lucide-react'
import AuthPopup from '@/components/AuthPopup'
import { createClient } from '@/utils/supabase/client'
import { cn } from '@/lib/utils'

interface ReviewFormProps {
    toolId: string
}

export default function ReviewForm({ toolId }: ReviewFormProps) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [showAuthPopup, setShowAuthPopup] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [loadingInitial, setLoadingInitial] = useState(true)
    const [existingReviewId, setExistingReviewId] = useState<string | null>(null)

    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClient()

    useEffect(() => {
        async function loadData() {
            try {
                const { data: { user: currentUser } } = await supabase.auth.getUser()
                setUser(currentUser)

                if (currentUser) {
                    const review = await getUserReviewForTool(toolId)
                    if (review) {
                        setRating(review.rating)
                        setComment(review.comment || '')
                        setExistingReviewId(review.id)
                    }
                }
            } catch (err) {
                console.error('Error loading review data:', err)
            } finally {
                setLoadingInitial(false)
            }
        }

        loadData()
    }, [toolId, supabase])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!user) {
            setShowAuthPopup(true)
            return
        }

        if (rating === 0) {
            setError('Please select a star rating.')
            return
        }

        const linkRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(\.com|\.org|\.net|\.io)/i
        if (linkRegex.test(comment)) {
            setError('Links are not allowed in reviews. Please describe your experience with text only.')
            return
        }

        setIsSubmitting(true)

        try {
            // Pass pathname for revalidation
            const result = await submitReview(toolId, rating, comment, pathname)

            if (result.error) {
                setError(result.error)
            } else {
                setExistingReviewId('just-submitted')
                // Force router refresh to update server components (ReviewList)
                router.refresh()
            }
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loadingInitial) {
        return <div className="h-[200px] bg-card/50 animate-pulse rounded-xl" />
    }

    return (
        <div className="bg-card rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
                {existingReviewId ? 'Your Review' : 'Write a review'}
            </h3>

            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-secondary grid place-items-center text-secondary-foreground font-medium uppercase">
                    {user ? (user.user_metadata?.full_name || user.email || 'U').charAt(0) : '?'}
                </div>
                <div className="text-sm">
                    <p className="font-medium text-foreground">
                        {user ? (user.user_metadata?.full_name || 'You') : 'Guest'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {existingReviewId ? 'Verified Reviewer' : 'Posting publicly'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Rating</label>
                    <div className="flex items-center gap-4">
                        <StarRating rating={rating} setRating={setRating} size={28} />
                        <span className="text-sm font-medium text-muted-foreground">
                            {rating > 0 ? `${rating} out of 5` : 'Select rating'}
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts about this tool... (No links allowed)"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                        maxLength={1000}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>No links allowed</span>
                        <span>{comment.length}/1000</span>
                    </div>
                </div>

                {error && (
                    <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-md border border-red-200 dark:border-red-900/50">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                        "bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto",
                        existingReviewId && "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {existingReviewId ? 'Updating...' : 'Post Review'}
                        </>
                    ) : (
                        existingReviewId ? 'Update Review' : 'Post Review'
                    )}
                </button>
            </form>

            <AuthPopup
                isOpen={showAuthPopup}
                onClose={() => setShowAuthPopup(false)}
                message="Please sign in to leave a review."
            />
        </div>
    )
}
