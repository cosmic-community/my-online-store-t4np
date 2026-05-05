import type { Review } from '@/types'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return null
  }

  // Calculate average rating
  let totalRating = 0
  let validRatings = 0
  reviews.forEach(review => {
    const ratingValue = review.metadata?.rating
    const rating = typeof ratingValue === 'number' ? ratingValue : Number(ratingValue)
    if (!isNaN(rating) && rating > 0) {
      totalRating += rating
      validRatings++
    }
  })

  const averageRating = validRatings > 0 ? totalRating / validRatings : 0

  return (
    <div>
      {validRatings > 0 && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 flex items-center gap-4">
          <div>
            <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
            <StarRating rating={averageRating} />
            <p className="text-sm text-gray-600 mt-1">
              Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}