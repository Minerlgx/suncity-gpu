'use client'

import Link from 'next/link'
import { Check, Zap, Shield, Globe, Clock, CreditCard } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Simple, Transparent <span style={{ color: '#3B82F6' }}>Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Pay only for what you use. No hidden fees, no long-term commitments.
          </p>
          
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: '#3B82F6' }} />
              <span>Hourly billing available</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" style={{ color: '#3B82F6' }} />
              <span>Save 20% with monthly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Pay As You Go */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Pay As You Go</h3>
                <p className="text-gray-600 text-sm">Flexible hourly billing</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold" style={{ color: '#3B82F6' }}>100%</span>
                <span className="text-gray-600"> of hourly rate</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" /> Pay per hour
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" /> No commitment
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" /> Cancel anytime
                </li>
              </ul>
              <Link href="/products" className="block w-full py-3 text-center rounded-lg border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white">
                Get Started
              </Link>
            </div>

            {/* Monthly */}
            <div className="bg-white rounded-xl p-8 shadow-md border-2" style={{ borderColor: '#3B82F6' }}>
              <div className="text-center mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Most Popular</span>
                <h3 className="text-xl font-bold mt-3 mb-2 text-gray-900">Monthly</h3>
                <p className="text-gray-600 text-sm">Save 20% with monthly billing</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold" style={{ color: '#3B82F6' }}>80%</span>
                <span className="text-gray-600"> of hourly rate</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" /> 20% discount
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" /> Priority support
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" /> Flexible scaling
                </li>
              </ul>
              <Link href="/products" className="block w-full py-3 text-center rounded-lg text-white font-medium" style={{ backgroundColor: '#3B82F6' }}>
                Get Started
              </Link>
            </div>

            {/* Annual */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Annual</h3>
                <p className="text-gray-600 text-sm">Save 40% with annual billing</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold" style={{ color: '#3B82F6' }}>60%</span>
                <span className="text-gray-600"> of hourly rate</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" /> 40% discount
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" /> Dedicated account manager
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" /> Custom solutions
                </li>
              </ul>
              <Link href="/contact" className="block w-full py-3 text-center rounded-lg border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-bold mb-2 text-gray-900">How does hourly billing work?</h3>
              <p className="text-gray-600">You only pay for the hours you use. Billing is calculated based on actual usage and charged at the end of each billing period.</p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2 text-gray-900">Can I upgrade or downgrade anytime?</h3>
              <p className="text-gray-600">Yes! You can scale your resources up or down at any time. Changes take effect immediately.</p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2 text-gray-900">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for enterprise accounts.</p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2 text-gray-900">Is there a free trial?</h3>
              <p className="text-gray-600">Yes! New users get $10 in credits to test our services. No credit card required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8">Browse our GPU options and deploy in minutes</p>
          <Link href="/products" className="inline-block px-8 py-4 rounded-lg text-white font-medium" style={{ backgroundColor: '#3B82F6' }}>
            View Products
          </Link>
        </div>
      </section>
    </div>
  )
}
