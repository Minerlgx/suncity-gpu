'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/f_auto,q_auto,w_4096/unsplashcom/photo-1600183811706-ca4b69fb6b58)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            High-Performance{' '}
            <span style={{ color: '#3B82F6' }}>GPU Servers</span>
            <br />in Asia-Pacific
          </h1>
          
          <p className="text-xl md:text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
            Deploy your AI models on enterprise-grade bare metal GPU servers. 
            Low latency, 99.9% uptime, 24/7 support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="px-8 py-4 text-lg font-medium rounded-lg text-white"
              style={{ backgroundColor: '#3B82F6' }}
            >
              View GPU Options
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 text-lg font-medium rounded-lg border-2 border-white text-white hover:bg-white/10"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* GPU Products - 放在上面 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Popular GPU Options</h2>
            <p className="text-gray-600 text-lg">Starting from $0.50/hour</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">AI Training</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">NVIDIA H100 80GB</h3>
              <p className="text-gray-600 text-sm mb-4">Industry-leading GPU for LLMs and large model training</p>
              <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold" style={{ color: '#3B82F6' }}>$2.50</span>
                  <span className="text-gray-500">/hour</span>
                </div>
                <Link href="/products" className="text-sm font-medium" style={{ color: '#3B82F6' }}>View Details →</Link>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">Training</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">NVIDIA RTX 4090 x8</h3>
              <p className="text-gray-600 text-sm mb-4">High performance cluster for deep learning</p>
              <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold" style={{ color: '#3B82F6' }}>$5.00</span>
                  <span className="text-gray-500">/hour</span>
                </div>
                <Link href="/products" className="text-sm font-medium" style={{ color: '#3B82F6' }}>View Details →</Link>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">Enterprise</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">NVIDIA H200 141GB</h3>
              <p className="text-gray-600 text-sm mb-4">Next-gen GPU for largest models and 200K context</p>
              <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold" style={{ color: '#3B82F6' }}>$3.50</span>
                  <span className="text-gray-500">/hour</span>
                </div>
                <Link href="/products" className="text-sm font-medium" style={{ color: '#3B82F6' }}>View Details →</Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/products" className="inline-block px-8 py-4 text-lg font-medium rounded-lg border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Data Centers - 放在产品下面 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Data Centers</h2>
            <p className="text-gray-600 text-lg">Strategically located across Asia-Pacific for optimal performance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Malaysia */}
            <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
              <div 
                className="aspect-[4/3] flex items-end"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Malaysia</h3>
                  <p className="text-blue-200">Kuala Lumpur (KL)</p>
                </div>
              </div>
              <div className="p-6 bg-gray-50">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Network</span>
                  <span className="font-medium text-gray-900">10Gbps</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Latency</span>
                  <span className="font-medium text-gray-900">&lt;5ms (SEA)</span>
                </div>
              </div>
            </div>

            {/* Indonesia */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div 
                className="aspect-[4/3] flex items-end"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Indonesia</h3>
                  <p className="text-orange-200">Jakarta</p>
                </div>
              </div>
              <div className="p-6 bg-gray-50">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Network</span>
                  <span className="font-medium text-gray-900">10Gbps</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Latency</span>
                  <span className="font-medium text-gray-900">&lt;3ms (Jakarta)</span>
                </div>
              </div>
            </div>

            {/* Japan */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div 
                className="aspect-[4/3] flex items-end"
                style={{
                  backgroundImage: 'url(/japan-datacenter.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Japan</h3>
                  <p className="text-red-200">Tokyo</p>
                </div>
              </div>
              <div className="p-6 bg-gray-50">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Network</span>
                  <span className="font-medium text-gray-900">10Gbps</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Latency</span>
                  <span className="font-medium text-gray-900">&lt;2ms (Tokyo)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">99.9% Uptime</h3>
              <p className="text-gray-600 text-sm">Enterprise-grade reliability</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Instant Deploy</h3>
              <p className="text-gray-600 text-sm">Ready in minutes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Asia-Pacific</h3>
              <p className="text-gray-600 text-sm">Low latency region</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Deploy?</h2>
          <p className="text-gray-400 text-lg mb-8">Get started with high-performance GPU servers today</p>
          <Link href="/products" className="inline-block px-8 py-4 text-lg font-medium rounded-lg text-white" style={{ backgroundColor: '#3B82F6' }}>
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  )
}
