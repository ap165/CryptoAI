/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0e17',
        surface: '#111827',
        surfaceLight: '#1f2937',
        border: '#374151',
        primary: '#6366f1',
        primaryLight: '#818cf8',
        accent: '#8b5cf6',
        positive: '#10b981',
        negative: '#ef4444',
        textPrimary: '#f9fafb',
        textSecondary: '#9ca3af',
        textMuted: '#6b7280'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
