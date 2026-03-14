'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, Server, CreditCard, Settings, Wallet, 
  User, Mail, Bell, Shield, Save, Check
} from 'lucide-react'
import { useAuthStore } from '@/hooks/useAuth'
import { useI18n } from '@/i18n'

export default function SettingsPage() {
  const router = useRouter()
  const { user, isAuthenticated, fetchUser } = useAuthStore()
  const { locale } = useI18n()
  const isJa = locale === 'ja'
  
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{isJa ? '設定' : 'Settings'}</h1>
            <p className="text-text-secondary">{isJa ? 'アカウント設定を管理' : 'Manage your account settings'}</p>
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
                <Link href="/dashboard/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface text-text-secondary hover:text-accent">
                  <CreditCard className="w-5 h-5" />
                  {isJa ? '注文履歴' : 'Orders'}
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 text-accent">
                  <Settings className="w-5 h-5" />
                  {isJa ? '設定' : 'Settings'}
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Section */}
            <div className="card">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                {isJa ? 'プロフィール' : 'Profile'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{isJa ? 'お名前' : 'Name'}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input max-w-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{isJa ? 'メールアドレス' : 'Email'}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input max-w-md"
                    disabled
                  />
                  <p className="text-text-muted text-sm mt-1">{isJa ? 'メールアドレスは変更できません' : 'Email cannot be changed'}</p>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-glow flex items-center gap-2"
                >
                  {saving ? (
                    <>{isJa ? '保存中...' : 'Saving...'}</>
                  ) : saved ? (
                    <>
                      <Check className="w-4 h-4" />
                      {isJa ? '保存しました' : 'Saved!'}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {isJa ? '変更を保存' : 'Save Changes'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="card">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-accent" />
                {isJa ? '通知設定' : 'Notifications'}
              </h2>
              
              <div className="space-y-4">
                {[
                  { id: 'email', label: isJa ? 'メール通知' : 'Email Notifications', desc: isJa ? '注文やアカウントの更新を受け取る' : 'Receive order and account updates' },
                  { id: 'marketing', label: isJa ? 'マーケティング' : 'Marketing', desc: isJa ? '新Productsやキャンペーン情報を受け取る' : 'Receive news about products and campaigns' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-text-muted text-sm">{item.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-surface-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Section */}
            <div className="card">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                {isJa ? 'セキュリティ' : 'Security'}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <div className="font-medium">{isJa ? 'パスワード' : 'Password'}</div>
                    <div className="text-text-muted text-sm">{isJa ? '最後に更新: 今日' : 'Last updated: Today'}</div>
                  </div>
                  <button className="btn-secondary text-sm">
                    {isJa ? '変更' : 'Change'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <div className="font-medium">{isJa ? '二段階認証' : 'Two-Factor Authentication'}</div>
                    <div className="text-text-muted text-sm">{isJa ? 'アカウントのセキュリティを強化' : 'Add an extra layer of security'}</div>
                  </div>
                  <button className="btn-secondary text-sm">
                    {isJa ? '有効化' : 'Enable'}
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card border-error/30">
              <h2 className="text-xl font-bold mb-6 text-error">{isJa ? '危険ゾーン' : 'Danger Zone'}</h2>
              
              <div className="flex items-center justify-between p-4 bg-error/10 rounded-lg border border-error/30">
                <div>
                  <div className="font-medium text-error">{isJa ? 'アカウントを削除' : 'Delete Account'}</div>
                  <div className="text-text-muted text-sm">{isJa ? 'この操作は元に戻せません' : 'This action cannot be undone'}</div>
                </div>
                <button className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/80 text-sm">
                  {isJa ? '削除' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
