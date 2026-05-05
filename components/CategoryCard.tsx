import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CategoryCard({ category }: { category: Category }) {
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const image = category.metadata?.category_image

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700"
    >
      {image && (
        <img
          src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
          alt={name}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      <div className="absolute inset-0 flex items-end p-4 md:p-6">
        <h3 className="text-white text-lg md:text-xl font-bold">{name}</h3>
      </div>
    </Link>
  )
}