import { getToolReviews } from '@/actions/review-actions'
import ReviewForm from './review-form'
import ReviewList from './review-list'
import StarRating from './star-rating'

interface ReviewSectionProps {
    toolId: string
}

export default async function ReviewSection({ toolId }: ReviewSectionProps) {
    // Fetch only public reviews on server (static usually)
    const { reviews, stats } = await getToolReviews(toolId)

    return (
        <section id="reviews" className="scroll-mt-24 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Reviews & Ratings</h2>
                    <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-foreground">{stats.average}</span>
                            <StarRating rating={Math.round(stats.average)} maxRating={5} size={24} readOnly />
                        </div>
                        <span className="text-muted-foreground text-sm">
                            ({stats.total} {stats.total === 1 ? 'review' : 'reviews'})
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Review Form */}
                <div className="lg:col-span-4 xl:col-span-5 order-2 lg:order-1">
                    <div className="lg:sticky lg:top-24">
                        <ReviewForm
                            toolId={toolId}
                        />
                    </div>
                </div>

                {/* Right: Review List */}
                <div className="lg:col-span-8 xl:col-span-7 order-1 lg:order-2">
                    <ReviewList reviews={reviews} />
                </div>
            </div>
        </section>
    )
}
