/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDFAF6',
        linen: '#F7F1E8',
        gold: '#C8963E',
        'gold-text': '#996010',
        'gold-light': '#E8B96A',
        'gold-dark': '#7A5015',
        'gold-btn': '#8A5E0A',
        navy: '#1B3A5C',
        'navy-dark': '#0F2440',
        terra: '#B85C38',
        charcoal: '#2C2C2C',
        muted: '#6B6B6B',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cinzel)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
