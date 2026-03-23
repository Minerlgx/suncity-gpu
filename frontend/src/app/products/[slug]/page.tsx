'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, ChevronRight, Cpu, Activity, Server, 
  HardDrive, Network, Shield, CheckCircle, Zap,
  ShoppingCart, CreditCard, Clock, AlertCircle
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

interface CreatedInstance {
  id: string
  ip: string
  port: string
  password: string
}

function SpecItem({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <div>
        <div className="text-gray-500 text-xs uppercase tracking-wider font-medium">{label}</div>
        <div className="font-bold text-gray-900 text-lg">{value || 'N/A'}</div>
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug') || ''
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [billingCycle, setBillingCycle] = useState<'HOURLY' | 'MONTHLY'>('HOURLY')
  const [purchasing, setPurchasing] = useState(false)
  const [createdInstance, setCreatedInstance] = useState<CreatedInstance | null>(null)

  useEffect(() => {
    fetchProduct()
  }, [slug])

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${slug}`)
      setProduct(data)
    } catch (err) {
      setError('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async () => {
    if (!product) return
    setPurchasing(true)
    setError('')
    
    try {
      const { data } = await api.post('/orders', {
        productId: product.id,
        billingCycle
      })
      setCreatedInstance(data.instance)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create instance')
    } finally {
      setPurchasing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#3B82F6' }}></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-blue-600 hover:underline">Back to Products</Link>
        </div>
      </div>
    )
  }

  if (createdInstance) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Instance Deployed!</h1>
            <p className="text-gray-600 mb-8">Your GPU instance is ready to use</p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Instance Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500 mb-1">IP Address</div>
                  <div className="font-mono text-blue-600 font-medium">{createdInstance.ip}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Port</div>
                  <div className="font-mono font-medium">{createdInstance.port}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Password</div>
                  <div className="font-mono font-medium">{createdInstance.password}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Status</div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    Running
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/dashboard" className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors text-center">
                Go to Dashboard
              </Link>
              <Link href="/products" className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-center">
                Deploy More
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const price = product ? (billingCycle === 'MONTHLY' ? product.priceMonthly : product.priceHourly) : 0

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/products" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Products
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-600 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Header */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    {product.featured && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-semibold rounded-full shadow-sm">
                        <Zap className="w-3 h-3" />
                        Popular
                      </span>
                    )}
                  </div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-500" />
                Specifications
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <SpecItem icon={Cpu} label="GPU" value={product.specs?.gpu} />
                <SpecItem icon={Activity} label="VRAM" value={product.specs?.vram} />
                <SpecItem icon={Server} label="CPU" value={product.specs?.cpu} />
                <SpecItem icon={HardDrive} label="RAM" value={product.specs?.ram} />
                <SpecItem icon={HardDrive} label="Storage" value={product.specs?.storage} />
                <SpecItem icon={Network} label="Network" value={product.specs?.network || 'Standard'} />
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Included Features
              </h2>

              <div className="grid md:grid-cols-2 gap-3">
                {[
                  '99.9% Uptime SLA',
                  'DDoS Protection',
                  '24/7 Technical Support',
                  'Automated Backups',
                  'SSH/RDP Access',
                  'Custom Firewall Rules',
                  'Real-time Monitoring',
                  'IPv4 Address',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Purchase Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 sticky top-24 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Deploy Instance</h2>

                {/* Billing Cycle */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setBillingCycle('HOURLY')}
                    className={`flex-1 py-4 px-4 rounded-xl border-2 transition-all font-medium ${
                      billingCycle === 'HOURLY'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-bold">Hourly</div>
                    <div className="text-sm text-gray-500">Pay as you go</div>
                  </button>
                  <button
                    onClick={() => setBillingCycle('MONTHLY')}
                    className={`flex-1 py-4 px-4 rounded-xl border-2 transition-all font-medium ${
                      billingCycle === 'MONTHLY'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-bold">Monthly</div>
                    <div className="text-sm text-green-600 font-medium">Save 20%</div>
                  </button>
                </div>

                {/* Price */}
                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-4">
                    <span className="text-5xl font-black" style={{ color: '#3B82F6' }}>${(price || 0).toFixed(2)}</span>
                    <span className="text-gray-500 text-lg ml-1">/{billingCycle === 'MONTHLY' ? 'mo' : 'hr'}</span>
                  </div>
                  {billingCycle === 'MONTHLY' && product && (
                    <div className="text-gray-500 text-sm">
                      Equivalent to ${(product.priceHourly * 730).toFixed(2)}/mo
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                {/* Purchase Button */}
                <button
                  onClick={handlePurchase}
                  disabled={purchasing || product.stock === 0}
                  className="w-full py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {purchasing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Deploy Now
                    </>
                  )}
                </button>

                {/* Stock Status */}
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
                  {product.stock > 0 ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 font-medium">{product.stock} instances available</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 font-medium">Out of stock</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
