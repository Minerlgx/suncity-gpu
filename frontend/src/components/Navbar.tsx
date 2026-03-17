'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/hooks/useAuth'

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuthStore()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Text */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white tracking-wider">SUNCITY</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold transition-colors ${
                  pathname === link.href 
                    ? 'text-white' 
                    : 'text-white hover:text-gray-300'
                }`}
                style={{ fontSize: '15px' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-white hover:text-gray-300 font-bold text-sm"
              style={{ fontSize: '15px' }}
            >
              Log In
            </Link>
            <Link 
              href="/register" 
              className="px-5 py-2 text-white text-sm font-bold rounded hover:bg-gray-800 transition-colors"
              style={{ backgroundColor: 'transparent', border: '1px solid white' }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white hover:text-gray-300 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-800 space-y-3">
              <Link 
                href="/login" 
                className="block text-white hover:text-gray-300 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Log In
              </Link>
              <Link 
                href="/register" 
                className="block px-5 py-2 text-white text-center text-sm font-bold rounded"
                style={{ backgroundColor: 'transparent', border: '1px solid white' }}
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
