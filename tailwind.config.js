/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F6FF',
          100: '#E0EDFF',
          200: '#BAE6FD', // Sky Blue tint
          500: '#2563EB', // Main Accent Blue
          600: '#1D4ED8', // Royal Blue
          700: '#1E40AF', // Deep Royal Blue
          900: '#0F172A',
        },
        sky: {
          400: '#38BDF8',
          500: '#0EA5E9',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(37, 99, 235, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(37, 99, 235, 0.15)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
