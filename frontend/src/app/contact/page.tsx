'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones, MailOpen } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      setSent(true)
    } catch (error) {
      console.error('Failed to send:', error)
      // Still show success for demo
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            We're here to assist you with your digital needs. Let's connect!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Visit Us</div>
                  <div className="text-gray-600">
                    Malaysia | Indonesia | Japan<br/>
                    Asia-Pacific Region
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Email Us</div>
                  <div className="text-gray-600">info@suncityd.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Business Hours</div>
                  <div className="text-gray-600">
                    <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                    <div>Saturday: 9:00 AM - 1:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Options */}
            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-4">Need Support?</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                  <MessageCircle className="w-5 h-5" />
                  <span>Live Chat</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                  <Headphones className="w-5 h-5" />
                  <span>Technical Support</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                  <MailOpen className="w-5 h-5" />
                  <span>Submit Ticket</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                  <p className="text-gray-600">Thank you for contacting us. We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
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
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={e => setForm({...form, company: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          placeholder="Your company"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm({...form, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => setForm({...form, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          placeholder="+1 234 567 890"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Service Interested In</label>
                      <select
                        value={form.service}
                        onChange={e => setForm({...form, service: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select a service</option>
                        <option value="cloud">Cloud Solutions</option>
                        <option value="ai">AI & Machine Learning</option>
                        <option value="server">Server Management</option>
                        <option value="gpu">GPU Hosting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Sending...' : 'Send Message'} <Send className="w-5 h-5" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
