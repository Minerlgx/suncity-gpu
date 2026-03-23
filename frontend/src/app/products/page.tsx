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
const datacenters = ['All', 'Malaysia', 'Indonesia', 'Japan']

function ProductsContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDatacenter, setSelectedDatacenter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('price-desc')

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
    const datacenterParam = searchParams.get('datacenter')
    if (gpuParam) {
      setSearchQuery(gpuParam)
    }
    if (datacenterParam) {
      setSelectedDatacenter(datacenterParam)
    }
    fetchProducts()
  }, [searchParams])

  const getCategoryEn = (cat: string) => {
    return cat
  }

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === getCategoryEn(selectedCategory)
    const matchesDatacenter = selectedDatacenter === 'All' || (p.specs?.datacenter && p.specs.datacenter.includes(selectedDatacenter))
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesDatacenter && matchesSearch
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Products</h1>
        <p className="text-gray-600 text-lg mb-8">Deploy powerful GPU instances in minutes. From RTX 4090 to H100, we have the hardware you need for AI, ML, and rendering workloads.</p>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 sticky top-20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Filter className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-lg text-white">Filters</h3>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">Category</h4>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === cat 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' 
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Center */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">Data Center</h4>
                <div className="space-y-1">
                  {datacenters.map(dc => (
                    <button
                      key={dc}
                      onClick={() => setSelectedDatacenter(dc)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        selectedDatacenter === dc 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' 
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {dc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-4">
                <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">Sort By</h4>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
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
                <p className="text-gray-400">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {sortedProducts.map(product => {
                  const inStock = product.stock > 0
                  return (
                    <div key={product.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold rounded-full shadow-sm">
                            {product.category}
                          </span>
                        </div>
                        <span className={`text-sm font-medium ${inStock ? 'text-green-600' : 'text-red-500'}`}>
                          {inStock ? `${product.stock} available` : 'Out of stock'}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                      {/* Specs */}
                      <div className="space-y-2 mb-4 bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Cpu className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700 font-medium">{product.specs?.gpu}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <HardDrive className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700">{product.specs?.vram}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Server className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700">{product.specs?.cpu}</span>
                        </div>
                        {product.specs?.network && (
                          <div className="flex items-center gap-2 text-sm">
                            <Network className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-700">{product.specs?.network}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-end pt-4 border-t border-gray-200">
                        <div>
                          <div className="text-gray-500 text-sm">Starting at</div>
                          <div className="text-3xl font-bold" style={{ color: '#3B82F6' }}>
                            ${product.priceHourly.toFixed(2)}
                            <span className="text-gray-500 text-base font-normal">/hr</span>
                          </div>
                        </div>
                        <Link 
                          href={`/products/${product.slug}`}
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all"
                        >
                          Details →
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
