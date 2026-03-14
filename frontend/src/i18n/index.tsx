'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'ja'

interface Translations {
  [key: string]: string
}

const translations: Record<Language, Translations> = {
  en: {
    // Nav
    'nav.products': 'Products',
    'nav.pricing': 'Pricing', 
    'nav.about': 'About',
    'nav.login': 'Log in',
    'nav.signup': 'Sign Up',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    
    // Home
    'home.hero.title': 'Enterprise GPU Cloud at Your Fingertips',
    'home.hero.subtitle': 'High-performance GPU instances starting at $0.50/hour. Deploy in seconds. Scale instantly.',
    'home.hero.cta': 'Get Started Free',
    'home.hero.viewGpus': 'View GPU Options',
    'home.stats.gpuInstances': 'GPU Instances',
    'home.stats.activeUsers': 'Active Users',
    'home.stats.uptime': 'Uptime SLA',
    'home.stats.countries': 'Countries',
    'home.features.title': 'Why Choose DENCONE?',
    'home.features.instant': 'Instant Deployment',
    'home.features.instantDesc': 'Spin up GPU instances in seconds, not hours.',
    'home.features.security': 'Enterprise Security',
    'home.features.securityDesc': 'DDoS protection, isolated networking, and encrypted storage.',
    'home.features.global': 'Global Infrastructure',
    'home.features.globalDesc': '15 data centers across 4 continents.',
    'home.features.hardware': 'Latest Hardware',
    'home.features.hardwareDesc': 'NVIDIA H100, A100, RTX 4090 and more.',
    'home.features.teams': 'Team Collaboration',
    'home.features.teamsDesc': 'Share instances with your team.',
    'home.features.monitoring': 'Real-time Monitoring',
    'home.features.monitoringDesc': 'Track GPU usage and costs in real-time.',
    'home.cta.title': 'Ready to Start?',
    'home.cta.subtitle': 'Get $10 free credits on your first account.',
    'home.cta.button': 'Create Free Account',
    
    // Products
    'products.title': 'GPU Servers',
    'products.subtitle': 'Deploy powerful GPU instances in seconds.',
    'products.startingAt': 'Starting at',
    'products.gpuModels': 'GPU Models',
    'products.viewDetails': 'View Details',
    'products.popular': 'Popular',
    
    // Pricing
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.subtitle': 'Pay only for what you use.',
    'pricing.paygo': 'Pay As You Go',
    'pricing.paygoDesc': 'Flexible hourly billing',
    'pricing.paygoPrice': '$0.50',
    'pricing.paygoUnit': '/hour starting',
    'pricing.monthly': 'Monthly Plan',
    'pricing.monthlyDesc': 'Save 20% on hourly rates',
    'pricing.monthlyPrice': '$300',
    'pricing.monthlyUnit': '/month starting',
    'pricing.bestValue': 'Best Value',
    'pricing.enterprise': 'Enterprise',
    'pricing.enterpriseDesc': 'Custom solutions',
    'pricing.enterprisePrice': 'Custom',
    'pricing.contactSales': 'Contact Sales',
    'pricing.viewGpus': 'View GPU Options',
    
    // About
    'about.title': 'About DENCONE',
    'about.subtitle': 'Leading the GPU Computing Revolution',
    'about.who': 'Who We Are',
    'about.whoText': 'DENCONE leads the GPU computing revolution with cutting-edge technology.',
    'about.why': 'Why Choose DENCONE',
    'about.performance': 'Performance-First Design',
    'about.performanceDesc': 'Every server is optimized for maximum GPU performance.',
    'about.reliability': 'Enterprise-Grade Reliability',
    'about.reliabilityDesc': 'Japanese quality standards with 99.9% uptime SLA.',
    'about.support': 'Expert Technical Support',
    'about.supportDesc': '24/7 support from GPU infrastructure specialists.',
    'about.gpu': 'Latest GPU Lineup',
    'about.gpuDesc': 'From B200, H200, H100, A100 to RTX 4090.',
    'about.stats.servers': 'Servers Deployed',
    'about.stats.gpus': 'GPUs Deployed',
    'about.stats.clients': 'Satisfied Clients',
    'about.stats.experience': 'Years Experience',
    'about.services': 'Our Services',
    'about.cta.title': 'Ready to Get Started?',
    'about.cta.contact': 'Contact Us',
    'about.cta.view': 'View GPUs',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Feel free to contact us for GPU sizing and quotations.',
    'contact.form.title': 'Send us a Message',
    'contact.form.name': 'Name',
    'contact.form.company': 'Company / Organization',
    'contact.form.email': 'Email',
    'contact.form.details': 'Inquiry Details',
    'contact.form.tip': 'Tip: Please include desired GPU models, number of nodes, and workloads.',
    'contact.form.submit': 'Send Message',
    'contact.form.sent': 'Message Sent!',
    'contact.form.sentDesc': 'We will get back to you within 24 hours.',
    'contact.info.title': 'Company Information',
    'contact.info.company': 'Dencone, Inc.',
    'contact.info.address': 'Address',
    'contact.info.addressText': '10-15 Shinsen-cho, Shibuya-ku, Tokyo, Japan',
    'contact.info.email': 'Email',
    'contact.info.response': 'Response Times',
    'contact.info.follow': 'Follow Us',
    
    // Auth
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to your DENCONE account',
    'auth.login.button': 'Sign In',
    'auth.login.noAccount': "Don't have an account?",
    'auth.login.signup': 'Sign up',
    'auth.register.title': 'Create Account',
    'auth.register.subtitle': 'Join DENCONE and start deploying GPUs',
    'auth.register.button': 'Create Account',
    'auth.register.hasAccount': 'Already have an account?',
    'auth.register.signin': 'Sign in',
    'auth.passwordReq': 'Password Requirements',
    'auth.passwordLen': 'At least 8 characters',
    'auth.passwordUpper': 'One uppercase letter',
    'auth.passwordLower': 'One lowercase letter',
    'auth.passwordNumber': 'One number',
    'auth.passwordMatch': 'Passwords do not match',
    
    // Footer
    'footer.product': 'Product',
    'footer.gpuServers': 'GPU Servers',
    'footer.features': 'Features',
    'footer.api': 'API',
    'footer.company': 'Company',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.aup': 'Acceptable Use',
    'footer.sla': 'SLA',
    'footer.copyright': 'All rights reserved.',
    'footer.madeWith': 'Made with for AI developers worldwide',
  },
  ja: {
    // Nav
    'nav.products': '製品',
    'nav.pricing': '料金',
    'nav.about': '会社情報',
    'nav.login': 'ログイン',
    'nav.signup': '新規登録',
    'nav.dashboard': 'ダッシュボード',
    'nav.logout': 'ログアウト',
    
    // Home
    'home.hero.title': 'GPUベアメタルで生成AIを解き放つ',
    'home.hero.subtitle': 'B200・H200・H100からRTX 5090まで。日本ロケーションのベアメタルサーバー。',
    'home.hero.cta': '見積もりを依頼',
    'home.hero.viewGpus': '料金を見る',
    'home.stats.gpuInstances': 'GPUインスタンス',
    'home.stats.activeUsers': 'アクティブユーザー',
    'home.stats.uptime': '可用性',
    'home.stats.countries': '対応国',
    'home.features.title': 'DENCONEの特长',
    'home.features.instant': 'Instant Deployment',
    'home.features.instantDesc': 'ベアメタルサーバー数秒でデプロイ。',
    'home.features.security': 'Enterprise Security',
    'home.features.securityDesc': 'DDoS保護、隔離ネットワーク、暗号化ストレージ。',
    'home.features.global': 'Global Infrastructure',
    'home.features.globalDesc': '日本国内4箇所のデータセンター。',
    'home.features.hardware': 'Latest Hardware',
    'home.features.hardwareDesc': 'H100、A100、RTX 4090など最新GPUをラインアップ。',
    'home.features.teams': 'Team Collaboration',
    'home.features.teamsDesc': 'チームでインスタンスを共有。',
    'home.features.monitoring': 'Real-time Monitoring',
    'home.features.monitoringDesc': 'GPU使用量とコストをリアルタイムで監視。',
    'home.cta.title': '今すぐ始める',
    'home.cta.subtitle': 'GPU構成のご相談・お見積りは、お気軽にお問い合わせください。',
    'home.cta.button': 'お問い合わせ',
    
    // Products
    'products.title': 'GPUサーバー',
    'products.subtitle': ' мощныеGPUインスタンスを数秒でデプロイ。',
    'products.startingAt': 'starting from',
    'products.gpuModels': 'GPUモデル',
    'products.viewDetails': '詳細を見る',
    'products.popular': '人気',
    
    // Pricing
    'pricing.title': '料金体系',
    'pricing.subtitle': '利用分だけお支払い。',
    'pricing.paygo': '従量制',
    'pricing.paygoDesc': '時間ごとの柔軟な請求',
    'pricing.paygoPrice': '$0.50',
    'pricing.paygoUnit': '/時間〜',
    'pricing.monthly': '月額プラン',
    'pricing.monthlyDesc': '20%割引',
    'pricing.monthlyPrice': '$300',
    'pricing.monthlyUnit': '/月〜',
    'pricing.bestValue': 'おすすめ',
    'pricing.enterprise': 'エンタープライズ',
    'pricing.enterpriseDesc': 'カスタムソリューション',
    'pricing.enterprisePrice': 'お問い合わせ',
    'pricing.contactSales': '見積もりを依頼',
    'pricing.viewGpus': 'GPUを見る',
    
    // About
    'about.title': 'DENCONEについて',
    'about.subtitle': 'GPUコンピューティング革命をリード',
    'about.who': '会社概要',
    'about.whoText': 'DENCONEは、最先端技術と日本品質でGPUコンピューティング革命をリードしています。',
    'about.why': 'DENCONE選ばれる理由',
    'about.performance': 'パフォーマンス重視',
    'about.performanceDesc': 'すべてのサーバーが最大GPUパフォーマンス用に最適化。',
    'about.reliability': 'エンタープライズ品質',
    'about.reliabilityDesc': '日本品質基準、99.9%アップタイムSLA。',
    'about.support': '専門家サポート',
    'about.supportDesc': 'GPUインフラの専門チームが24/7サポート。',
    'about.gpu': '最新GPUラインアップ',
    'about.gpuDesc': 'B200、H200、H100、A100からRTX 4090まで。',
    'about.stats.servers': '導入サーバー数',
    'about.stats.gpus': '導入GPU数',
    'about.stats.clients': '顧客数',
    'about.stats.experience': '経験年数',
    'about.services': 'サービス',
    'about.cta.title': 'カウンセディング',
    'about.cta.contact': 'お問い合わせ',
    'about.cta.view': 'GPUを見る',
    
    // Contact
    'contact.title': 'お問い合わせ',
    'contact.subtitle': 'GPU構成のご相談・お見積りは、お気軽にお問い合わせください。',
    'contact.form.title': 'お問い合わせフォーム',
    'contact.form.name': 'お名前',
    'contact.form.company': '会社名・組織名',
    'contact.form.email': 'メールアドレス',
    'contact.form.details': 'ご相談内容',
    'contact.form.tip': 'GPUモデル、台数、開始希望時期、工作内容をお書き添えください。',
    'contact.form.submit': '送信',
    'contact.form.sent': '送信完了！',
    'contact.form.sentDesc': '24時間以内にご返答いたします。',
    'contact.info.title': '会社情報',
    'contact.info.company': '株式会社電コネ',
    'contact.info.address': '所在地',
    'contact.info.addressText': '東京都渋谷区神泉町10番15号',
    'contact.info.email': 'メール',
    'contact.info.response': '応答時間',
    'contact.info.follow': 'フォローする',
    
    // Auth
    'auth.login.title': 'ログイン',
    'auth.login.subtitle': 'DENCONEアカウントにログイン',
    'auth.login.button': 'ログイン',
    'auth.login.noAccount': 'アカウントをお持ちでない方',
    'auth.login.signup': '新規登録',
    'auth.register.title': '新規登録',
    'auth.register.subtitle': 'DENCONEに登録してGPUデプロイを開始',
    'auth.register.button': '登録する',
    'auth.register.hasAccount': 'すでにアカウントをお持ちの方',
    'auth.register.signin': 'ログイン',
    'auth.passwordReq': 'パスワード要件',
    'auth.passwordLen': '8文字以上',
    'auth.passwordUpper': '大文字1文字以上',
    'auth.passwordLower': '小文字1文字以上',
    'auth.passwordNumber': '数字1文字以上',
    'auth.passwordMatch': 'パスワードが一致しません',
    
    // Footer
    'footer.product': '製品',
    'footer.gpuServers': 'GPUベアメタル',
    'footer.features': '特长',
    'footer.api': 'API',
    'footer.company': '会社情報',
    'footer.blog': 'ブログ',
    'footer.careers': '採用',
    'footer.contact': 'お問い合わせ',
    'footer.legal': '法的情報',
    'footer.privacy': 'プライバシーポリシー',
    'footer.terms': '利用規約',
    'footer.aup': '使用方法',
    'footer.sla': 'SLA',
    'footer.copyright': '全著作権所有。',
    'footer.madeWith': 'AI開発者のために',
  },
}

interface I18nContextType {
  locale: Language
  setLocale: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Language>('ja')

  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem('dencone-locale')
    if (saved === 'en' || saved === 'ja') {
      setLocale(saved)
    } else {
      // Default to Japanese
      setLocale('ja')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('dencone-locale', locale)
  }, [locale])

  const t = (key: string): string => {
    return translations[locale][key] || translations['en'][key] || key
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}

export function useLocale() {
  const { locale, setLocale } = useI18n()
  return { locale, setLocale }
}
