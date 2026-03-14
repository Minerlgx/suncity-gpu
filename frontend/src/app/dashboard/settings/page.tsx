'use client'
import { useState } from 'react'
import { useAuthStore } from '@/hooks/useAuth'
import api from '@/lib/api'

export default function SettingsPage() {
  const { user, fetchUser } = useAuthStore()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' })
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put('/auth/profile', form)
      await fetchUser()
      setMsg('Profile updated!')
    } catch (e) { setMsg('Error updating profile') }
    finally { setSaving(false) }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" value={form.email} disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100" />
            </div>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {msg && <p className="text-sm text-green-600">{msg}</p>}
          </form>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Account</h2>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Email</span>
              <span className="text-gray-900">{user?.email}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Role</span>
              <span className="text-gray-900 capitalize">{user?.role}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-600">Balance</span>
              <span className="text-gray-900 font-bold">${user?.balance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
