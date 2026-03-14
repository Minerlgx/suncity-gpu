'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Server,
  CreditCard,
  Settings,
  Wallet,
  ChevronRight,
  Zap
} from 'lucide-react'
import { useAuthStore } from '@/hooks/useAuth'
import { useI18n } from '@/i18n'
import api from '@/lib/api'

interface Instance {
  id: string
  status: string
  ip: string
  port: number
  product: {
    name: string
    specs: { gpu: string; vram: string }
  }
}

interface Order {
  id: string
  status: string
  amount: number
  type: string
  createdAt: string
  product: { name: string }
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, fetchUser } = useAuthStore()
  const { locale } = useI18n()
  const isJa = locale === 'ja'
  
  const [instances, setInstances] = useState<Instance[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    fetchData()
  }, [isAuthenticated])

  const fetchData = async () => {
    try {
      const [instRes, orderRes] = await Promise.all([
        api.get('/instances'),
        api.get('/orders')
      ])
      setInstances(instRes.data.instances || [])
      setOrders(orderRes.data.orders || [])
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  const activeCount = instances.filter(i => i.status === 'RUNNING').length
  const totalSpent = orders
    .filter(o => ['PAID', 'ACTIVE', 'COMPLETED'].includes(o.status))
    .reduce((sum, o) => sum + o.amount, 0)

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{isJa ? 'ダッシュボード' : 'Dashboard'}</h1>
            <p className="text-text-secondary">{isJa ? 'ようこそ、' : 'Welcome back, '}{user?.name || user?.email}</p>
          </div>
          <Link href="/products" className="btn-glow">
            <Zap className="w-4 h-4 mr-2" />
            {isJa ? '新規デプロイ' : 'Deploy New GPU'}
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <Server className="w-5 h-5 text-accent" />
              <span className="text-text-secondary">{isJa ? 'インスタンス' : 'Instances'}</span>
            </div>
            <div className="text-3xl font-bold">{instances.length}</div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-success" />
              <span className="text-text-secondary">{isJa ? 'アクティブ' : 'Active'}</span>
            </div>
            <div className="text-3xl font-bold">{activeCount}</div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="w-5 h-5 text-purple" />
              <span className="text-text-secondary">{isJa ? '注文' : 'Orders'}</span>
            </div>
            <div className="text-3xl font-bold">{orders.length}</div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="w-5 h-5 text-warning" />
              <span className="text-text-secondary">{isJa ? '合計使用額' : 'Total Spent'}</span>
            </div>
            <div className="text-3xl font-bold">${totalSpent.toFixed(2)}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Instances */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">{isJa ? 'インスタンス' : 'Your Instances'}</h2>
                <Link href="/dashboard/instances" className="text-accent text-sm flex items-center gap-1">
                  {isJa ? 'すべて見る' : 'View all'} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {instances.length === 0 ? (
                <div className="text-center py-12 text-text-secondary">
                  <Server className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>{isJa ? 'インスタンスがありません' : 'No instances yet'}</p>
                  <Link href="/products" className="text-accent hover:underline mt-2 inline-block">
                    {isJa ? '最初のGPUをデプロイ' : 'Deploy your first GPU'}
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {instances.slice(0, 5).map((instance) => (
                    <div
                      key={instance.id}
                      className="flex items-center justify-between p-4 bg-surface rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          instance.status === 'RUNNING' ? 'bg-success' : 'bg-text-muted'
                        }`} />
                        <div>
                          <div className="font-medium">{instance.product?.name}</div>
                          <div className="text-sm text-text-secondary">
                            {instance.ip}:{instance.port}
                          </div>
                        </div>
                      </div>
                      <span className={`badge ${
                        instance.status === 'RUNNING' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {instance.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Balance Card */}
            <div className="card bg-gradient-to-br from-accent/10 to-purple/10 border-accent/30">
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="w-6 h-6 text-accent" />
                <span className="text-text-secondary">{isJa ? '残高' : 'Balance'}</span>
              </div>
              <div className="text-3xl font-bold mb-4">${user?.balance?.toFixed(2) || '0.00'}</div>
              <button className="btn-glow w-full text-sm py-2">
                {isJa ? 'チャージ' : 'Add Funds'}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-semibold mb-4">{isJa ? 'クイックアクション' : 'Quick Actions'}</h3>
              <div className="space-y-2">
                <Link
                  href="/products"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface transition-colors"
                >
                  <Server className="w-5 h-5 text-accent" />
                  <span>{isJa ? 'GPUを探す' : 'Browse GPUs'}</span>
                </Link>
                <Link
                  href="/dashboard/orders"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface transition-colors"
                >
                  <CreditCard className="w-5 h-5 text-accent" />
                  <span>{isJa ? '注文履歴' : 'View Orders'}</span>
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface transition-colors"
                >
                  <Settings className="w-5 h-5 text-accent" />
                  <span>{isJa ? '設定' : 'Settings'}</span>
                </Link>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">{isJa ? '最近の注文' : 'Recent Orders'}</h3>
                <Link href="/dashboard/orders" className="text-accent text-sm">
                  {isJa ? 'すべて' : 'View all'}
                </Link>
              </div>
              {orders.length === 0 ? (
                <p className="text-text-secondary text-sm">{isJa ? '注文がありません' : 'No orders yet'}</p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex justify-between items-center text-sm"
                    >
                      <div>
                        <div className="font-medium">{order.product?.name}</div>
                        <div className="text-text-secondary text-xs">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono">${order.amount}</div>
                        <span className={`badge text-xs ${
                          order.status === 'ACTIVE' ? 'badge-success' :
                          order.status === 'PENDING' ? 'badge-warning' : 'badge-error'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
