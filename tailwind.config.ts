import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#030712', // page
        card: '#050816',       // main cards
        cardSoft: '#050a18',
        borderSoft: '#111827',
        accent: '#22c55e'
      },
      borderRadius: {
        xl: '0.8rem',
        '2xl': '1rem'
      },
      boxShadow: {
        card: '0 0 0 1px rgba(15,23,42,0.9)'
      },
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'sans-serif']
      }
    }
  }, plugins: []
};

export default config;
