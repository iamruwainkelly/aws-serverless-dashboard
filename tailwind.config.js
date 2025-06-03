/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'dark-bg': '#0b0d17',
        'dark-surface': '#1a1d29',
        'dark-border': '#2d3748',
        'primary-orange': '#ff6c00',
        'primary-purple': '#a678ff',
        'text-primary': '#f8f8f8',
        'text-secondary': '#999999',
        'light-text': '#a0a0a0',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ff6c00 0%, #a678ff 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'matrix-fall': 'matrix-fall 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(255, 108, 0, 0.5)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(255, 108, 0, 0.8)',
            transform: 'scale(1.05)',
          },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'matrix-fall': {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
      },
      backdropFilter: {
        'glass': 'blur(10px) saturate(180%)',
      },
    },
  },
  plugins: [],
}