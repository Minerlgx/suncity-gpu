'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, Server, CreditCard, Settings, 
  ChevronRight, Clock, CheckCircle, XCircle, AlertCircle
} from 'lucide-react'
import { useAuthStore } from '@/hooks/useAuth'
import { useI18n } from '@/i18n'
import api from '@/lib/api'

interface Order {
  id: string
  status: string
  amount: number
  type: string
  createdAt: string
  paidAt: string
  product: { 
    name: string 
    specs: { gpu: string; vram: string }
  }
}

export default function OrdersPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { locale } = useI18n()
  const isJa = locale === 'ja'
  
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    fetchOrders()
  }, [isAuthenticated])

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders')
      setOrders(data.orders || [])
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; icon: any }> = {
      PENDING: { bg: 'badge-warning', text: isJa ? '保留中' : 'Pending', icon: Clock },
      PAID: { bg: 'badge-accent', text: isJa ? '支払済' : 'Paid', icon: CheckCircle },
      PROCESSING: { bg: 'badge-warning', text: isJa ? '処理中' : 'Processing', icon: Clock },
      ACTIVE: { bg: 'badge-success', text: isJa ? 'アクティブ' : 'Active', icon: CheckCircle },
      COMPLETED: { bg: 'badge-success', text: isJa ? '完了' : 'Completed', icon: CheckCircle },
      CANCELLED: { bg: 'badge-error', text: isJa ? 'キャンセル' : 'Cancelled', icon: XCircle },
      REFUNDED: { bg: 'badge-error', text: isJa ? '返金済' : 'Refunded', icon: AlertCircle },
    }
    const s = statusMap[status] || { bg: 'badge-warning', text: status, icon: Clock }
    return (
      <span className={`badge ${s.bg}`}>
        <s.icon className="w-3 h-3 mr-1" />
        {s.text}
      </span>
    )
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(isJa ? 'ja-JP' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{isJa ? '注文履歴' : 'Orders'}</h1>
            <p className="text-text-secondary">{isJa ? 'すべての注文を確認' : 'View all your orders'}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <nav className="space-y-2">
                <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface text-text-secondary hover:text-accent">
                  <LayoutDashboard className="w-5 h-5" />
                  {isJa ? 'ダッシュボード' : 'Dashboard'}
                </Link>
                <Link href="/dashboard/orders" className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 text-accent">
                  <CreditCard className="w-5 h-5" />
                  {isJa ? '注文履歴' : 'Orders'}
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface text-text-secondary hover:text-accent">
                  <Settings className="w-5 h-5" />
                  {isJa ? '設定' : 'Settings'}
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="card">
                <div className="animate-pulse space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-20 bg-surface rounded-lg"></div>
                  ))}
                </div>
              </div>
            ) : orders.length === 0 ? (
              <div className="card text-center py-12">
                <CreditCard className="w-16 h-16 text-text-muted mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{isJa ? '注文がありません' : 'No orders yet'}</h3>
                <p className="text-text-secondary mb-6">{isJa ? 'GPUサーバーをデプロイして始めましょう' : 'Deploy a GPU server to get started'}</p>
                <Link href="/products" className="btn-glow">
                  {isJa ? 'GPUを見る' : 'Browse GPUs'}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                          <Server className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <div className="font-bold">{order.product?.name}</div>
                          <div className="text-text-muted text-sm">
                            {order.product?.specs?.gpu} • {order.product?.specs?.vram}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-accent">${order.amount}</div>
                        <div className="text-text-muted text-sm">
                          {order.type === 'MONTHLY' ? (isJa ? '月額' : 'Monthly') : (isJa ? '時間制' : 'Hourly')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-border">
                      <div className="flex items-center gap-4">
                        {getStatusBadge(order.status)}
                        <span className="text-text-muted text-sm">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                      
                      <Link 
                        href={`/dashboard/orders/${order.id}`}
                        className="flex items-center gap-1 text-accent text-sm hover:underline"
                      >
                        {isJa ? '詳細を見る' : 'View Details'}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
