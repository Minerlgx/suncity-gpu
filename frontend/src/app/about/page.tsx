'use client'

import { Globe, Cpu, Server, Cloud, Shield, Users, CheckCircle, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Suncity</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            We provide world-class cloud computing and AI solutions for businesses across Asia-Pacific.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-gray-600 mb-6">
                Suncity is a leading provider of cloud computing and AI solutions, dedicated to helping businesses 
                transform their operations through cutting-edge technology. With years of experience in the industry, 
                we have established ourselves as a trusted partner for enterprises seeking digital transformation.
              </p>
              <p className="text-gray-600">
                Our team of experts is committed to delivering innovative solutions that drive growth and efficiency. 
                We believe in building long-term relationships with our clients through exceptional service and support.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Clients Worldwide</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime Guarantee</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Technical Support</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                <div className="text-gray-600">Data Centers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Our Services</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Comprehensive digital solutions tailored to your business needs
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Cloud className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cloud Solutions</h3>
              <p className="text-gray-600">
                Our cloud computing solutions are designed to meet the unique requirements of your business. 
                With a focus on security, scalability, and flexibility.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI & Machine Learning</h3>
              <p className="text-gray-600">
                Transform your operations with our AI systems that are built to learn and adapt. 
                By integrating AI into your processes, we help you unlock new efficiencies.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Server className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Server Management</h3>
              <p className="text-gray-600">
                Our comprehensive server support covers all aspects of your infrastructure, 
                from design and deployment to ongoing maintenance and optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Suncity</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Enterprise Security</h3>
              <p className="text-gray-600 text-sm">Bank-level security protocols</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Global Network</h3>
              <p className="text-gray-600 text-sm">Asia-Pacific coverage</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600 text-sm">Dedicated support 24/7</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Proven Track Record</h3>
              <p className="text-gray-600 text-sm">500+ clients worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8">
            Contact us today to learn how we can help transform your business
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Contact Us <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  )
}
