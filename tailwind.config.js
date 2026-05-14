/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mojito': {
          50: '#f4fce3',
          100: '#e9f9c9',
          200: '#d1f29a',
          300: '#ade65e',
          400: '#8bd632',
          500: '#6cbd1b',
          600: '#539611',
          700: '#417311',
          800: '#365b13',
          900: '#2f4d15',
          950: '#172b07',
          accent: '#A3E635',
        },
        'charcoal': {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#2a2a2a',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
      },
      fontFamily: {
        'sans': ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        'mono': ['"Space Mono"', 'monospace'],
      },
      backgroundImage: {
        'mojito-gradient': 'linear-gradient(135deg, #A3E635 0%, #65A30D 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'mojito': '0 0 30px -5px rgba(163, 230, 53, 0.4)',
        'inner-glass': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}
