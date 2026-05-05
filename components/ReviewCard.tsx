import Link from 'next/link'
import type { Review } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'

export default function ReviewCard({
  review,
  showProduct = false,
}: {
  review: Review
  showProduct?: boolean
}) {
  const customerName = getMetafieldValue(review.metadata?.customer_name) || 'Anonymous'
  const ratingValue = review.metadata?.rating
  const rating = typeof ratingValue === 'number' ? ratingValue : Number(getMetafieldValue(ratingValue)) || 0
  const reviewTitle = getMetafieldValue(review.metadata?.review_title)
  const reviewText = getMetafieldValue(review.metadata?.review_text)
  const verifiedPurchase = review.metadata?.verified_purchase
  const product = review.metadata?.product

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <StarRating rating={rating} />
          {reviewTitle && (
            <h3 className="font-semibold text-gray-900 mt-2">{reviewTitle}</h3>
          )}
        </div>
        {verifiedPurchase && (
          <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        )}
      </div>

      {reviewText && (
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{reviewText}</p>
      )}

      <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100">
        <span className="font-medium text-gray-900">{customerName}</span>
        {showProduct && product && (
          <Link
            href={`/products/${product.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {getMetafieldValue(product.metadata?.product_name) || product.title}
          </Link>
        )}
      </div>
    </div>
  )
}