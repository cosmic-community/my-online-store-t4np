import Link from 'next/link'
import type { Product } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function ProductCard({ product }: { product: Product }) {
  const productName = getMetafieldValue(product.metadata?.product_name) || product.title
  const price = product.metadata?.price
  const compareAtPrice = product.metadata?.compare_at_price
  const mainImage = product.metadata?.main_image
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status)
  const featured = product.metadata?.featured
  const category = product.metadata?.category

  const inStock = inventoryStatus !== 'Out of Stock'
  const onSale = compareAtPrice && Number(compareAtPrice) > Number(price)

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {mainImage ? (
          <img
            src={`${mainImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={productName}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {featured && (
            <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded">
              Featured
            </span>
          )}
          {onSale && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Sale
            </span>
          )}
        </div>

        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-900 font-semibold px-4 py-2 rounded">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {category && (
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {getMetafieldValue(category.metadata?.name) || category.title}
          </p>
        )}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {productName}
        </h3>
        <div className="flex items-baseline gap-2">
          {price !== undefined && price !== null && (
            <span className="text-lg font-bold text-gray-900">
              ${Number(price).toFixed(2)}
            </span>
          )}
          {onSale && (
            <span className="text-sm text-gray-400 line-through">
              ${Number(compareAtPrice).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}