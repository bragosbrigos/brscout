/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        br: { 
          green: '#10b981', 
          gold: '#f59e0b', 
          blue: '#0ea5e9', 
          dark: '#0b1120', 
          card: '#111827', 
          border: '#1f2937' 
        },
        accent: { 
          light: '#d9f99d', 
          DEFAULT: '#84cc16', 
          dark: '#4d7c0f' 
        }
      },
      fontFamily: { 
        sans: ['Inter', 'sans-serif'] 
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        float: { 
          '0%, 100%': { transform: 'translateY(0px)' }, 
          '50%': { transform: 'translateY(-15px)' } 
        },
        slideUp: { 
          '0%': { transform: 'translateY(30px)', opacity: '0' }, 
          '100%': { transform: 'translateY(0)', opacity: '1' } 
        },
        fadeIn: { 
          '0%': { opacity: '0' }, 
          '100%': { opacity: '1' } 
        },
        scaleIn: { 
          '0%': { transform: 'scale(0.9)', opacity: '0' }, 
          '100%': { transform: 'scale(1)', opacity: '1' } 
        },
        gradient: { 
          '0%, 100%': { backgroundPosition: '0% 50%' }, 
          '50%': { backgroundPosition: '100% 50%' } 
        },
        shimmer: { 
          '0%': { backgroundPosition: '-200% 0' }, 
          '100%': { backgroundPosition: '200% 0' } 
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
      },
      backgroundSize: {
        '200%': '200%',
      },
    },
  },
  plugins: [],
}
