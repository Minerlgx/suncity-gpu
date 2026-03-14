'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Shield, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import axios from 'axios'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
      const { data } = await axios.post(`${API_URL}/admin/login`, { email, password })
      
      // Store admin token
      localStorage.setItem('dencone-auth', JSON.stringify({
        state: { token: data.token, user: data.user }
      }))
      
      router.push('/admin')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid admin credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-text-secondary">Access Suncity GPU administration</p>
        </div>

        <div className="card">
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-error/10 border border-error/30 text-error">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dencone.com"
                  className="input pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-11"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-glow w-full flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Access Admin Panel'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-accent hover:underline text-sm">
              ← Back to user login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
