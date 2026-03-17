'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Search, Filter, Cpu, Zap, ChevronRight, Server, 
  HardDrive, Network, Activity, CheckCircle, XCircle,
  ShoppingCart, CreditCard, Clock
} from 'lucide-react'
import api from '@/lib/api'

interface Product {
  id: string
  name: string
  slug: string
  category: string
  description: string
  specs: {
    gpu: string
    vram: string
    cpu: string
    ram: string
    storage: string
    network?: string
    datacenter?: string
  }
  priceHourly: number
  priceMonthly: number
  stock: number
  featured: boolean
}

const categories = ['All', 'AI Training', 'Inference', 'Training', 'Visualization', 'Professional Viz']

function ProductsContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('price-asc')

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products')
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const gpuParam = searchParams.get('gpu')
    if (gpuParam) {
      setSearchQuery(gpuParam)
    }
    fetchProducts()
  }, [searchParams])

  const getCategoryEn = (cat: string) => {
    return cat
  }

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === getCategoryEn(selectedCategory)
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceHourly - b.priceHourly
    if (sortBy === 'price-desc') return b.priceHourly - a.priceHourly
    return 0
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#3B82F6' }}></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ paddingTop: '64px' }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Category</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <h3 className="font-semibold text-gray-900 mb-4 mt-8">Sort By</h3>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search GPUs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {sortedProducts.map(product => {
                  const inStock = product.stock > 0
                  return (
                    <div key={product.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {product.category}
                          </span>
                        </div>
                        <span className={`text-sm ${inStock ? 'text-green-600' : 'text-red-500'}`}>
                          {inStock ? `${product.stock} available` : 'Out of stock'}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                      {/* Specs */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Cpu className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{product.specs?.gpu}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <HardDrive className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{product.specs?.vram}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Server className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{product.specs?.cpu}</span>
                        </div>
                        {product.specs?.network && (
                          <div className="flex items-center gap-2 text-sm">
                            <Network className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{product.specs?.network}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                        <div>
                          <div className="text-gray-500 text-sm">Starting at</div>
                          <div className="text-2xl font-bold" style={{ color: '#3B82F6' }}>
                            ${product.priceHourly.toFixed(2)}
                            <span className="text-gray-500 text-base font-normal">/hour</span>
                          </div>
                        </div>
                        <Link 
                          href={`/products/${product.slug}`}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#3B82F6' }}></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
