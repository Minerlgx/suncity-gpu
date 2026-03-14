'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Users,
  Server,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  ChevronRight,
  Search,
  Shield,
  AlertCircle
} from 'lucide-react'
import api from '@/lib/api'

interface Stats {
  totalUsers: number
  activeInstances: number
  totalOrders: number
  revenue: number
}

interface User {
  id: string
  email: string
  name: string
  role: string
  balance: number
  createdAt: string
  _count: { orders: number; instances: number }
}

interface Order {
  id: string
  status: string
  amount: number
  type: string
  createdAt: string
  user: { email: string; name: string }
  product: { name: string }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeInstances: 0,
    totalOrders: 0,
    revenue: 0
  })
  const [users, setUsers] = useState<User[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('dencone-auth')
      if (!token) {
        router.push('/admin/login')
        return
      }

      // Try to fetch admin stats
      const parsed = JSON.parse(token)
      const { data } = await api.get('/admin/stats', {
        headers: { Authorization: `Bearer ${parsed.state?.token}` }
      })

      setStats(data.stats)
      setIsAdmin(true)
      fetchData(parsed.state?.token)
    } catch (error) {
      router.push('/admin/login')
    }
  }

  const fetchData = async (token: string) => {
    try {
      const [usersRes, ordersRes] = await Promise.all([
        api.get('/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('/admin/orders', { headers: { Authorization: `Bearer ${token}` } })
      ])
      setUsers(usersRes.data.users || [])
      setOrders(ordersRes.data.orders || [])
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const token = JSON.parse(localStorage.getItem('dencone-auth') || '{}').state?.token
      await api.patch(`/admin/users/${userId}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Shield className="w-8 h-8 text-accent" />
              Admin Dashboard
            </h1>
            <p className="text-text-secondary">Manage users, orders, and system</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-text-secondary">Total Users</span>
            </div>
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <Server className="w-5 h-5 text-success" />
              <span className="text-text-secondary">Active Instances</span>
            </div>
            <div className="text-3xl font-bold">{stats.activeInstances}</div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingCart className="w-5 h-5 text-purple" />
              <span className="text-text-secondary">Total Orders</span>
            </div>
            <div className="text-3xl font-bold">{stats.totalOrders}</div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-warning" />
              <span className="text-text-secondary">Revenue</span>
            </div>
            <div className="text-3xl font-bold">${stats.revenue?.toFixed(2) || '0.00'}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-text-secondary text-sm border-b border-surface-border">
                    <th className="pb-3 font-medium">Order</th>
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).map((order) => (
                    <tr key={order.id} className="border-b border-surface-border/50">
                      <td className="py-3">
                        <div className="font-medium">{order.product?.name}</div>
                        <div className="text-xs text-text-muted">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-3 text-sm">{order.user?.email}</td>
                      <td className="py-3 font-mono">${order.amount}</td>
                      <td className="py-3">
                        <span className={`badge text-xs ${
                          order.status === 'ACTIVE' ? 'badge-success' :
                          order.status === 'PENDING' ? 'badge-warning' :
                          order.status === 'PAID' ? 'badge-accent' : 'badge-error'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Users */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Users</h2>
              <span className="text-text-secondary text-sm">{users.length} total</span>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-surface rounded-lg"
                >
                  <div>
                    <div className="font-medium">{user.name || 'Unknown'}</div>
                    <div className="text-sm text-text-secondary">{user.email}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <div className="font-mono">${user.balance?.toFixed(2)}</div>
                      <div className="text-text-muted">
                        {user._count?.orders} orders, {user._count?.instances} instances
                      </div>
                    </div>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="input py-1 px-2 text-sm w-24"
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
