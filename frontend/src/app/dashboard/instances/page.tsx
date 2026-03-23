'use client'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { Play, Square, Trash2, Copy } from 'lucide-react'

interface Instance { id: string; status: string; ip: string; port: number; product: { name: string; specs: { gpu: string } } }

export default function InstancesPage() {
  const [instances, setInstances] = useState<Instance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/instances').then(r => { setInstances(r.data.instances || []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const handleAction = async (id: string, action: string) => {
    try { await api.post(`/instances/${id}/${action}`) } catch (e) { console.error(e) }
  }

  const copyIP = (ip: string, port: number) => { navigator.clipboard.writeText(`${ip}:${port}`) }

  if (loading) return <div className="min-h-screen pt-20 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor:'#3B82F6'}}></div></div>

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Instances</h1>
        {instances.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <p className="text-gray-400 mb-4">No instances yet</p>
            <a href="/products" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg" style={{backgroundColor:'#3B82F6'}}>Deploy Now</a>
          </div>
        ) : (
          <div className="space-y-4">
            {instances.map(inst => (
              <div key={inst.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-900">{inst.product?.name}</div>
                    <div className="text-sm text-gray-400 mt-1">{inst.ip}:{inst.port}</div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full capitalize text-sm">{inst.status}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleAction(inst.id, 'start')} className="p-2 bg-green-100 text-green-600 rounded-lg"><Play size={16} /></button>
                  <button onClick={() => handleAction(inst.id, 'stop')} className="p-2 bg-yellow-100 text-yellow-600 rounded-lg"><Square size={16} /></button>
                  <button onClick={() => copyIP(inst.ip, inst.port)} className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Copy size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
