import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { I18nProvider } from '@/i18n'

export const metadata: Metadata = {
  title: 'Suncity GPU Cloud - Bare Metal GPU Servers',
  description: 'Enterprise-grade bare metal GPU servers in Asia-Pacific. Deploy AI models with H100, H200, RTX 4090. Low latency, high performance, 99.9% uptime.',
  keywords: ['GPU cloud', 'bare metal GPU', 'AI training', 'deep learning', 'NVIDIA H100', 'RTX 4090', 'GPU rental', 'Malaysia', 'Indonesia', 'Japan'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <I18nProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}
