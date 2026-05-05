// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug, getReviewsByProduct, getMetafieldValue } from '@/lib/cosmic'
import ProductGallery from '@/components/ProductGallery'
import VariantList from '@/components/VariantList'
import ReviewList from '@/components/ReviewList'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProduct(product.id)

  const productName = getMetafieldValue(product.metadata?.product_name) || product.title
  const description = getMetafieldValue(product.metadata?.description)
  const price = product.metadata?.price
  const compareAtPrice = product.metadata?.compare_at_price
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status)
  const sku = getMetafieldValue(product.metadata?.sku)
  const stockQuantity = product.metadata?.stock_quantity
  const category = product.metadata?.category
  const variants = product.metadata?.variants || []
  const mainImage = product.metadata?.main_image
  const gallery = product.metadata?.gallery || []

  const allImages = mainImage ? [mainImage, ...gallery] : gallery

  const inStock = inventoryStatus !== 'Out of Stock' && (stockQuantity === undefined || stockQuantity > 0)

  return (
    <div className="py-12">
      <div className="container-custom">
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{productName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={allImages} title={productName} />

          <div>
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="inline-block text-sm text-primary-600 hover:text-primary-700 font-medium mb-2"
              >
                {getMetafieldValue(category.metadata?.name) || category.title}
              </Link>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{productName}</h1>

            <div className="flex items-baseline gap-3 mb-6">
              {price !== undefined && price !== null && (
                <span className="text-3xl font-bold text-gray-900">
                  ${Number(price).toFixed(2)}
                </span>
              )}
              {compareAtPrice && Number(compareAtPrice) > Number(price) && (
                <span className="text-xl text-gray-400 line-through">
                  ${Number(compareAtPrice).toFixed(2)}
                </span>
              )}
            </div>

            <div className="mb-6">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  inStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                <span className={`w-2 h-2 rounded-full mr-2 ${inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {inventoryStatus || (inStock ? 'In Stock' : 'Out of Stock')}
              </span>
            </div>

            {description && (
              <div className="prose prose-gray max-w-none mb-6">
                <div
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            )}

            {variants.length > 0 && (
              <div className="mb-6">
                <VariantList variants={variants} />
              </div>
            )}

            <button
              disabled={!inStock}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-colors ${
                inStock
                  ? 'bg-primary-600 hover:bg-primary-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {sku && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">SKU: {sku}</p>
              </div>
            )}
          </div>
        </div>

        {reviews.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Customer Reviews ({reviews.length})
            </h2>
            <ReviewList reviews={reviews} />
          </div>
        )}
      </div>
    </div>
  )
}