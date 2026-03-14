/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1C1E22',
        surface: '#1C1E22',
        'surface-card': '#2A2D32',
        'surface-border': '#3D4047',
        'surface-hover': '#363940',
        'surface-muted': '#484F58',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B0B3B8',
        'text-muted': '#6E7681',
        accent: '#3B82F6',
        purple: '#8B5CF6',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(48, 54, 61, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(48, 54, 61, 0.3) 1px, transparent 1px)',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
