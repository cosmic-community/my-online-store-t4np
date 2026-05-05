// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getProductsByCategory, getMetafieldValue } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)
  const categoryName = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const categoryImage = category.metadata?.category_image

  return (
    <div>
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-900 text-white">
        {categoryImage && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={`${categoryImage.imgix_url}?w=2400&h=600&fit=crop&auto=format,compress`}
              alt={categoryName}
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        )}
        <div className="relative container-custom py-16 md:py-24">
          <nav className="mb-4 text-sm text-white/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-white">Categories</Link>
            <span className="mx-2">/</span>
            <span>{categoryName}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{categoryName}</h1>
          {description && (
            <p className="text-lg text-white/90 max-w-2xl">{description}</p>
          )}
        </div>
      </div>

      <div className="py-12">
        <div className="container-custom">
          <p className="text-gray-600 mb-8">
            {products.length} {products.length === 1 ? 'product' : 'products'} in this category
          </p>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No products in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}