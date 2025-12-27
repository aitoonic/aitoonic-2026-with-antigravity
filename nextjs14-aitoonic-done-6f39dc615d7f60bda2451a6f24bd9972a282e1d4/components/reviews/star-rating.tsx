'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface StarRatingProps {
    rating: number
    setRating?: (rating: number) => void
    maxRating?: number
    size?: number
    readOnly?: boolean
    className?: string
}

export default function StarRating({
    rating,
    setRating,
    maxRating = 5,
    size = 20,
    readOnly = false,
    className,
}: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0)

    return (
        <div className={cn('flex items-center gap-0.5', className)}>
            {Array.from({ length: maxRating }).map((_, i) => {
                const starValue = i + 1
                return (
                    <button
                        key={i}
                        type="button"
                        className={cn(
                            'transition-all duration-200 focus:outline-none focus-visible:ring-2 ring-primary/50 rounded-sm p-0.5',
                            readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95'
                        )}
                        onClick={() => !readOnly && setRating?.(starValue)}
                        onMouseEnter={() => !readOnly && setHoverRating(starValue)}
                        onMouseLeave={() => !readOnly && setHoverRating(0)}
                        disabled={readOnly}
                        aria-label={`Rate ${starValue} stars`}
                    >
                        <Star
                            size={size}
                            className={cn(
                                'transition-colors duration-200',
                                (hoverRating || rating) >= starValue
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'fill-transparent text-muted-foreground/30'
                            )}
                        />
                    </button>
                )
            })}
        </div>
    )
}
