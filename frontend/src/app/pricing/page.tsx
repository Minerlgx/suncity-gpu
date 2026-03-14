'use client'

import Link from 'next/link'
import { Check, Zap, Shield, Globe, Clock, CreditCard, HelpCircle, MessageCircle } from 'lucide-react'
import { useI18n } from '@/i18n'

export default function PricingPage() {
  const { locale } = useI18n()
  const isJa = locale === 'ja'

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">
            {isJa ? 'Pricing体系' : 'Simple, Transparent'} <span className="text-gradient">{isJa ? '' : 'Pricing'}</span>
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            {isJa ? '利用分だけお支払い。隐藏Pricing一切なし。' : 'Pay only for what you use. No hidden fees, no long-term commitments.'}
          </p>
          
          {/* Pricing Toggle Info */}
          <div className="flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>{isJa ? '時間ごとの請求' : 'Hourly billing available'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>{isJa ? '月額20%割引' : 'Save 20% with monthly'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Pay As You Go */}
            <div className="card">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{isJa ? '従量制' : 'Pay As You Go'}</h3>
                <p className="text-text-secondary text-sm">{isJa ? '時間ごとの柔軟な請求' : 'Flexible hourly billing'}</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-accent">$0.50</span>
                <span className="text-text-secondary">{isJa ? '/時間〜' : '/hour starting'}</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>{isJa ? '縛りなし' : 'No commitments'}</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>{isJa ? '利用分だけお支払い' : 'Pay only for hours used'}</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>{isJa ? '数秒でデプロイ' : 'Instant deployment'}</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>{isJa ? '全機能込み' : 'All features included'}</span>
                </li>
              </ul>
              <Link href="/products" className="btn-secondary w-full text-center block">
                {isJa ? 'GPUを見る' : 'View GPU Options'}
              </Link>
            </div>

            {/* Monthly */}
            <div className="card border-accent relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge badge-accent">
                <Zap className="w-3 h-3 mr-1" />
                {isJa ? 'おすすめ' : 'Best Value'}
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{isJa ? '月額プラン' : 'Monthly Plan'}</h3>
                <p className="text-text-secondary text-sm">{isJa ? '時間割りを20%割引' : 'Save 20% on hourly rates'}</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-accent">$300</span>
                <span className="text-text-secondary">{isJa ? '/月〜' : '/month starting'}</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>{isJa ? '20%割引' : '20% discount vs hourly'}</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>{isJa ? '専有リソース' : 'Dedicated resources'}</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>{isJa ? '優先サポート' : 'Priority support'}</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>{isJa ? '無料バックアップ' : 'Free backup storage'}</span>
                </li>
              </ul>
              <Link href="/products" className="btn-glow w-full text-center block">
                {isJa ? '始める' : 'Get Started'}
              </Link>
            </div>

            {/* Enterprise */}
            <div className="card">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{isJa ? 'エンタープライズ' : 'Enterprise'}</h3>
                <p className="text-text-secondary text-sm">{isJa ? 'カスタムソリューション' : 'Custom solutions'}</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-accent">{isJa ? 'Contact' : 'Custom'}</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>{isJa ? '専用インフラ' : 'Dedicated infrastructure'}</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>{isJa ? 'カスタムSLA' : 'Custom SLAs'}</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>{isJa ? '24/7專門サポート' : '24/7 dedicated support'}</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span>{isJa ? 'ボリューム割引' : 'Volume discounts'}</span>
                </li>
              </ul>
              <Link href="/contact" className="btn-secondary w-full text-center block">
                {isJa ? 'Get Quote' : 'Contact Sales'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-surface-card/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isJa ? '含まれる機能' : "What's Included"}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Zap, title: isJa ? ' Instant Deployment' : 'Instant Deployment', desc: isJa ? '数秒でGPUインスタンスをデプロイ' : 'Spin up GPU instances in seconds' },
              { icon: Shield, title: isJa ? 'Enterprise Security' : 'Enterprise Security', desc: isJa ? 'DDoS保護、ファイアウォール、暗号化' : 'DDoS protection, firewalls, encrypted storage' },
              { icon: Globe, title: isJa ? 'Global Network' : 'Global Network', desc: isJa ? '日本国内含む15以上のデータセンター' : '15+ data centers worldwide' },
              { icon: Clock, title: isJa ? '99.9%可用性' : '99.9% Uptime', desc: isJa ? 'SLA保証による可用性' : 'Guaranteed availability with SLA' },
              { icon: CreditCard, title: isJa ? 'Flexible Billing' : 'Flexible Billing', desc: isJa ? '時間単位または月額、解約自由' : 'Hourly or monthly, cancel anytime' },
              { icon: HelpCircle, title: isJa ? '24/7サポート' : '24/7 Support', desc: isJa ? '専門家が常時サポート' : 'Expert help whenever you need it' },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-text-secondary text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">{isJa ? 'ご質問はありませんか？' : 'Have Questions?'}</h2>
          <p className="text-text-secondary mb-6">
            {isJa ? 'ニーズ合ったプラン選択をお手伝いします。' : 'Our team is here to help you choose the right plan.'}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="btn-glow">
              <MessageCircle className="w-4 h-4 mr-2" />
              {isJa ? 'Contact' : 'Contact Us'}
            </Link>
            <Link href="/products" className="btn-secondary">
              {isJa ? 'GPUを見る' : 'Browse GPUs'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
