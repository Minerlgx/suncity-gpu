'use client'
import { useEffect, useState } from 'react'
import api from '@/lib/api'

interface Order { id: string; status: string; amount: number; type: string; createdAt: string; product: { name: string } }

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/orders').then(r => { setOrders(r.data.orders || []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="min-h-screen pt-20 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor:'#3B82F6'}}></div></div>

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <p className="text-gray-400 mb-4">No orders yet</p>
            <a href="/products" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg" style={{backgroundColor:'#3B82F6'}}>Browse Products</a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-900">{order.product?.name || 'Order'}</div>
                    <div className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${order.amount}</div>
                    <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full capitalize">{order.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
