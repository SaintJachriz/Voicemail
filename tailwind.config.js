/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#03050A',
          900: '#05070D',
          800: '#0A0F1A',
          700: '#0F1626',
        },
        cyan: {
          glow: '#00E5FF',
        },
        blue: {
          glow: '#2979FF',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
        body: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 8px rgba(0,229,255,0.6), 0 0 24px rgba(0,229,255,0.25)',
        'neon-blue': '0 0 8px rgba(41,121,255,0.6), 0 0 24px rgba(41,121,255,0.25)',
        'neon-soft': '0 0 40px rgba(0,229,255,0.08)',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1, filter: 'drop-shadow(0 0 6px rgba(0,229,255,0.8))' },
          '50%': { opacity: 0.6, filter: 'drop-shadow(0 0 2px rgba(0,229,255,0.4))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'grid-pan': {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '60px 60px' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 12s linear infinite',
        'spin-reverse': 'spin-reverse 18s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'grid-pan': 'grid-pan 4s linear infinite',
      },
    },
  },
  plugins: [],
}
