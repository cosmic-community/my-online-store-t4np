import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛍️</span>
            <span className="text-xl font-bold text-gray-900">My Online Store</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Categories
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Reviews
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-700 hover:text-primary-600 transition-colors" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 text-gray-700 hover:text-primary-600 transition-colors relative" aria-label="Cart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="md:hidden flex items-center gap-4 pb-3 overflow-x-auto">
          <Link href="/" className="text-sm text-gray-700 hover:text-primary-600 font-medium whitespace-nowrap">Home</Link>
          <Link href="/products" className="text-sm text-gray-700 hover:text-primary-600 font-medium whitespace-nowrap">Products</Link>
          <Link href="/categories" className="text-sm text-gray-700 hover:text-primary-600 font-medium whitespace-nowrap">Categories</Link>
          <Link href="/reviews" className="text-sm text-gray-700 hover:text-primary-600 font-medium whitespace-nowrap">Reviews</Link>
        </nav>
      </div>
    </header>
  )
}