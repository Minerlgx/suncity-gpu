'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, Server, CreditCard, Settings, 
  Play, Square, Trash2, Terminal, Key, Copy, Check
} from 'lucide-react'
import { useAuthStore } from '@/hooks/useAuth'
import { useI18n } from '@/i18n'
import api from '@/lib/api'

interface Instance {
  id: string
  status: string
  ip: string
  port: number
  password: string
  startedAt: string
  product: {
    name: string
    specs: { gpu: string; vram: string }
  }
}

export default function InstancesPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { locale } = useI18n()
  const isJa = locale === 'ja'
  
  const [instances, setInstances] = useState<Instance[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    fetchInstances()
  }, [isAuthenticated])

  const fetchInstances = async () => {
    try {
      const { data } = await api.get('/instances')
      setInstances(data.instances || [])
    } catch (error) {
      console.error('Failed to fetch instances:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (id: string, action: 'start' | 'stop' | 'delete') => {
    if (action === 'delete') {
      if (!confirm(isJa ? '本当に削除しますか？' : 'Are you sure you want to delete this instance?')) {
        return
      }
    }
    
    setActionLoading(id)
    try {
      if (action === 'delete') {
        await api.delete(`/instances/${id}`)
      } else {
        await api.post(`/instances/${id}/${action}`)
      }
      fetchInstances()
    } catch (error) {
      console.error(`Failed to ${action} instance:`, error)
    } finally {
      setActionLoading(null)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (!isAuthenticated) {
    return null
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string }> = {
      PENDING: { bg: 'badge-warning', text: isJa ? '準備中' : 'Pending' },
      CREATING: { bg: 'badge-warning', text: isJa ? '作成中' : 'Creating' },
      RUNNING: { bg: 'badge-success', text: isJa ? '実行中' : 'Running' },
      STOPPED: { bg: 'badge-error', text: isJa ? '停止' : 'Stopped' },
      TERMINATED: { bg: 'badge-error', text: isJa ? '終了' : 'Terminated' },
    }
    const s = statusMap[status] || { bg: 'badge-warning', text: status }
    return <span className={`badge ${s.bg}`}>{s.text}</span>
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{isJa ? 'インスタンス' : 'Instances'}</h1>
            <p className="text-text-secondary">{isJa ? 'GPUインスタンスを管理' : 'Manage your GPU instances'}</p>
          </div>
          <Link href="/products" className="btn-glow">
            {isJa ? '新規デプロイ' : 'Deploy New'}
          </Link>
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
                <Link href="/dashboard/instances" className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 text-accent">
                  <Server className="w-5 h-5" />
                  {isJa ? 'インスタンス' : 'Instances'}
                </Link>
                <Link href="/dashboard/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface text-text-secondary hover:text-accent">
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
                    <div key={i} className="h-32 bg-surface rounded-lg"></div>
                  ))}
                </div>
              </div>
            ) : instances.length === 0 ? (
              <div className="card text-center py-12">
                <Server className="w-16 h-16 text-text-muted mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{isJa ? 'インスタンスがありません' : 'No instances yet'}</h3>
                <p className="text-text-secondary mb-6">{isJa ? 'GPUサーバーをデプロイして始めましょう' : 'Deploy a GPU server to get started'}</p>
                <Link href="/products" className="btn-glow">
                  {isJa ? 'GPUを見る' : 'Browse GPUs'}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {instances.map((instance) => (
                  <div key={instance.id} className="card">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${instance.status === 'RUNNING' ? 'bg-success' : 'bg-text-muted'}`} />
                        <div>
                          <div className="font-bold">{instance.product?.name}</div>
                          <div className="text-text-muted text-sm">
                            {instance.product?.specs?.gpu} • {instance.product?.specs?.vram}
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(instance.status)}
                    </div>
                    
                    {/* Connection Info */}
                    <div className="bg-surface rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Terminal className="w-4 h-4 text-accent" />
                          <span className="text-text-muted">{isJa ? '接続先' : 'Connection'}</span>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(`${instance.ip}:${instance.port}`, `ip-${instance.id}`)}
                          className="text-accent text-sm flex items-center gap-1"
                        >
                          {copiedId === `ip-${instance.id}` ? (
                            <><Check className="w-3 h-3" /> {isJa ? 'コピー済' : 'Copied'}</>
                          ) : (
                            <><Copy className="w-3 h-3" /> {isJa ? 'コピー' : 'Copy'}</>
                          )}
                        </button>
                      </div>
                      <div className="font-mono text-accent">
                        {instance.ip}:{instance.port}
                      </div>
                      
                      <div className="flex items-center justify-between mb-2 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Key className="w-4 h-4 text-accent" />
                          <span className="text-text-muted">Password</span>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(instance.password || '', `pw-${instance.id}`)}
                          className="text-accent text-sm flex items-center gap-1"
                        >
                          {copiedId === `pw-${instance.id}` ? (
                            <><Check className="w-3 h-3" /> {isJa ? 'コピー済' : 'Copied'}</>
                          ) : (
                            <><Copy className="w-3 h-3" /> {isJa ? 'コピー' : 'Copy'}</>
                          )}
                        </button>
                      </div>
                      <div className="font-mono">
                        {instance.password || '********'}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {instance.status === 'STOPPED' && (
                        <button
                          onClick={() => handleAction(instance.id, 'start')}
                          disabled={actionLoading === instance.id}
                          className="btn-glow text-sm flex items-center gap-1"
                        >
                          <Play className="w-4 h-4" />
                          {isJa ? '開始' : 'Start'}
                        </button>
                      )}
                      {instance.status === 'RUNNING' && (
                        <button
                          onClick={() => handleAction(instance.id, 'stop')}
                          disabled={actionLoading === instance.id}
                          className="btn-secondary text-sm flex items-center gap-1"
                        >
                          <Square className="w-4 h-4" />
                          {isJa ? '停止' : 'Stop'}
                        </button>
                      )}
                      <button
                        onClick={() => handleAction(instance.id, 'delete')}
                        disabled={actionLoading === instance.id}
                        className="btn-secondary text-sm flex items-center gap-1 text-error hover:border-error"
                      >
                        <Trash2 className="w-4 h-4" />
                        {isJa ? '削除' : 'Delete'}
                      </button>
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
