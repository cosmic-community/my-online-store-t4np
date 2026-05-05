'use client'

import { useState } from 'react'
import type { Variant } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function VariantList({ variants }: { variants: Variant[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(variants[0]?.id || null)

  // Group variants by type
  const groupedByType: Record<string, Variant[]> = {}
  variants.forEach(variant => {
    const type = getMetafieldValue(variant.metadata?.variant_type) || 'Options'
    if (!groupedByType[type]) {
      groupedByType[type] = []
    }
    groupedByType[type].push(variant)
  })

  const typeKeys = Object.keys(groupedByType)

  return (
    <div className="space-y-4">
      {typeKeys.map(type => {
        const items = groupedByType[type]
        if (!items || items.length === 0) return null

        return (
          <div key={type}>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{type}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map(variant => {
                const variantName = getMetafieldValue(variant.metadata?.variant_name) || variant.title
                const stock = variant.metadata?.stock
                const outOfStock = stock !== undefined && Number(stock) <= 0
                const isSelected = selectedId === variant.id

                return (
                  <button
                    key={variant.id}
                    onClick={() => !outOfStock && setSelectedId(variant.id)}
                    disabled={outOfStock}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                      outOfStock
                        ? 'border-gray-200 text-gray-400 line-through cursor-not-allowed'
                        : isSelected
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {variantName}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}