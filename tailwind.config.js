/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F5EFEB',
          300: '#EFE7DE',
          400: '#ECE3D6',
          500: '#E4D8C8',
          600: '#D5C4B0',
          800: '#8C7E6C',
          900: '#4A4135',
        },
        sage: {
          50: '#F4F7F5',
          100: '#EDF2EE',
          200: '#DCE6DF',
          300: '#BDCEBF',
          400: '#8DA396',
          500: '#71887B',
          600: '#5B7065',
          700: '#44594E',
          800: '#35453C',
          900: '#232E28',
          950: '#141C18',
        },
        terracotta: {
          50: '#FDF7F4',
          100: '#FBF0EB',
          200: '#F5DFD5',
          300: '#ECC4B3',
          400: '#E27E58',
          500: '#D96B43',
          600: '#C85A32',
          700: '#B34923',
          800: '#963816',
          900: '#742C12',
          950: '#4A1907',
        },
        charcoal: {
          800: '#2E2A27',
          900: '#24211E',
          950: '#181614',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.35s ease-out forwards',
        'pulse-urgent': 'pulseUrgent 1.8s infinite',
        'subtle-bounce': 'subtleBounce 2s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseUrgent: {
          '0%, 100%': { borderColor: '#E53E3E', boxShadow: '0 0 0 0 rgba(229, 62, 62, 0.4)' },
          '50%': { borderColor: '#9B2C2C', boxShadow: '0 0 0 8px rgba(229, 62, 62, 0)' },
        },
        subtleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      }
    },
  },
  plugins: [],
}
