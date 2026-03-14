'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await api.post('/auth/register', { name: form.name, email: form.email, password: form.password })
      router.push('/login?registered=true')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">SUNCITY GPU</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Get started with GPU hosting</p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={form.confirmPassword}
                onChange={e => setForm({...form, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
