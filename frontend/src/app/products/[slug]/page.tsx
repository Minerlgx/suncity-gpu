'use client'

import { useState, useEffect, Suspense } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Cpu, Zap, Server, HardDrive, Network, Activity, 
  ChevronRight, CheckCircle, Shield, Clock, CreditCard,
  ShoppingCart, ArrowLeft, AlertCircle, Terminal, Key
} from 'lucide-react'
import { useAuthStore } from '@/hooks/useAuth'
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
  }
  priceHourly: number
  priceMonthly: number
  stock: number
  featured: boolean
}

function ProductDetailContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [error, setError] = useState('')
  const [billingCycle, setBillingCycle] = useState<'HOURLY' | 'MONTHLY'>('HOURLY')
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)
  const [createdInstance, setCreatedInstance] = useState<any>(null)

  useEffect(() => {
    fetchProduct()
  }, [params.slug])

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${params.slug}`)
      setProduct(data.product)
    } catch (error) {
      console.error('Failed to fetch product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=' + encodeURIComponent(`/products/${params.slug}`))
      return
    }

    setError('')
    setPurchasing(true)

    try {
      // Create order
      const { data: orderData } = await api.post('/orders', {
        productId: product?.id,
        type: billingCycle,
      })

      // Pay order and create instance
      const { data: payData } = await api.post(`/orders/${orderData.order.id}/pay`)
      
      setPurchaseSuccess(true)
      setCreatedInstance(payData.instance)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Purchase failed. Please try again.')
    } finally {
      setPurchasing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products" className="btn-glow">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  if (purchaseSuccess && createdInstance) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="card text-center">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Instance Deployed!</h1>
            <p className="text-text-secondary mb-8">
              Your GPU instance is ready to use
            </p>

            {/* Instance Details */}
            <div className="bg-surface rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-accent" />
                Instance Details
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-text-muted mb-1">IP Address</div>
                  <div className="font-mono text-accent">{createdInstance.ip}</div>
                </div>
                <div>
                  <div className="text-text-muted mb-1">Port</div>
                  <div className="font-mono">{createdInstance.port}</div>
                </div>
                <div>
                  <div className="text-text-muted mb-1">Password</div>
                  <div className="font-mono">{createdInstance.password}</div>
                </div>
                <div>
                  <div className="text-text-muted mb-1">Status</div>
                  <span className="badge badge-success">Running</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/dashboard" className="btn-glow flex-1">
                Go to Dashboard
              </Link>
              <Link href="/products" className="btn-secondary flex-1">
                Deploy More
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const price = billingCycle === 'MONTHLY' ? product.priceMonthly : product.priceHourly

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-surface-card border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/products" className="hover:text-accent flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Products
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Header */}
            <div className="card">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    {product.featured && (
                      <span className="badge badge-accent">
                        <Zap className="w-3 h-3 mr-1" />
                        Popular
                      </span>
                    )}
                  </div>
                  <span className="badge bg-surface-border text-text-secondary">
                    {product.category}
                  </span>
                </div>
              </div>

              <p className="text-text-secondary text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="card">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-accent" />
                Specifications
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <SpecItem 
                  icon={Cpu}
                  label="GPU"
                  value={product.specs?.gpu}
                />
                <SpecItem 
                  icon={Activity}
                  label="VRAM"
                  value={product.specs?.vram}
                />
                <SpecItem 
                  icon={Server}
                  label="CPU"
                  value={product.specs?.cpu}
                />
                <SpecItem 
                  icon={HardDrive}
                  label="RAM"
                  value={product.specs?.ram}
                />
                <SpecItem 
                  icon={HardDrive}
                  label="Storage"
                  value={product.specs?.storage}
                />
                <SpecItem 
                  icon={Network}
                  label="Network"
                  value={product.specs?.network || 'Standard'}
                />
              </div>
            </div>

            {/* Features */}
            <div className="card">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
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
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Purchase Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold mb-6">Deploy Instance</h2>

              {/* Billing Cycle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setBillingCycle('HOURLY')}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                    billingCycle === 'HOURLY'
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-surface-border text-text-secondary hover:border-accent/50'
                  }`}
                >
                  <div className="font-medium">Hourly</div>
                  <div className="text-sm">Pay as you go</div>
                </button>
                <button
                  onClick={() => setBillingCycle('MONTHLY')}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                    billingCycle === 'MONTHLY'
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-surface-border text-text-secondary hover:border-accent/50'
                  }`}
                >
                  <div className="font-medium">Monthly</div>
                  <div className="text-sm text-success">Save 20%</div>
                </button>
              </div>

              {/* Price */}
              <div className="text-center mb-6 pb-6 border-b border-surface-border">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-accent">${price.toFixed(2)}</span>
                  <span className="text-text-secondary">/{billingCycle === 'MONTHLY' ? 'month' : 'hour'}</span>
                </div>
                {billingCycle === 'MONTHLY' && (
                  <div className="text-text-muted text-sm mt-1">
                    Equivalent to ${(product.priceHourly * 730).toFixed(2)}/month
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-error/10 border border-error/30 text-error text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Purchase Button */}
              <button
                onClick={handlePurchase}
                disabled={purchasing || product.stock === 0}
                className="btn-glow w-full py-4 text-lg flex items-center justify-center gap-2"
              >
                {purchasing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                    Deploying...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Deploy Now
                  </>
                )}
              </button>

              {/* Stock Status */}
              <div className="flex items-center justify-center gap-2 mt-4 text-sm">
                {product.stock > 0 ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-success">{product.stock} instances available</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-error" />
                    <span className="text-error">Out of stock</span>
                  </>
                )}
              </div>

              {/* Info */}
              <div className="mt-6 pt-6 border-t border-surface-border text-xs text-text-muted space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Instant deployment in seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Free DDoS protection included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Cancel anytime, no commitments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SpecItem({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div>
        <div className="text-text-muted text-xs">{label}</div>
        <div className="font-medium">{value || 'N/A'}</div>
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  )
}
