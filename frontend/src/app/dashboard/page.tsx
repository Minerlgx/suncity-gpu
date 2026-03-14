'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Server, CreditCard, Settings, Wallet, ChevronRight } from 'lucide-react'
import { useAuthStore } from '@/hooks/useAuth'
import api from '@/lib/api'

interface Instance {
  id: string
  status: string
  ip: string
  port: number
  product: { name: string; specs: { gpu: string; vram: string } }
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
  const [instances, setInstances] = useState<Instance[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    fetchUser()
    loadData()
  }, [isAuthenticated])

  const loadData = async () => {
    try {
      const [instRes, orderRes] = await Promise.all([
        api.get('/instances'),
        api.get('/orders')
      ])
      setInstances(instRes.data.instances || [])
      setOrders(orderRes.data.orders || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12" style={{ borderColor: '#3B82F6', borderBottomColor: 'transparent' }}></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'User'}</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Server className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{instances.length}</div>
                <div className="text-gray-500 text-sm">Instances</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
                <div className="text-gray-500 text-sm">Orders</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${user?.balance || 0}</div>
                <div className="text-gray-500 text-sm">Balance</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{user?.role || 'User'}</div>
                <div className="text-gray-500 text-sm">Account Type</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/products" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Browse GPUs</h3>
              <p className="text-gray-500 text-sm">View available GPU servers</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
          <Link href="/dashboard/orders" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">My Orders</h3>
              <p className="text-gray-500 text-sm">View order history</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
          <Link href="/dashboard/settings" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Settings</h3>
              <p className="text-gray-500 text-sm">Account settings</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>

        {/* Instances */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Instances</h2>
            <Link href="/dashboard/instances" className="text-sm font-medium" style={{ color: '#3B82F6' }}>View All</Link>
          </div>
          {instances.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No instances yet</p>
              <Link href="/products" className="inline-block px-6 py-2 rounded-lg text-white font-medium" style={{ backgroundColor: '#3B82F6' }}>
                Deploy Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {instances.slice(0, 3).map(inst => (
                <div key={inst.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{inst.product?.name || 'GPU Instance'}</div>
                    <div className="text-sm text-gray-500">{inst.ip}:{inst.port}</div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full capitalize">{inst.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
