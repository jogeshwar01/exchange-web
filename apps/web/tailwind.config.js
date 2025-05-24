/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': '#090909',
        'container-bg': '#121212',
        'container-bg-hover': '#262626',
        'container-bg-selected': '#262626',
        'container-bg-tweet': '#111d2e',
        'container-border': '#262626',
        'positive-green': '#34cb88',
        'positive-green-hover': '#5dd5a0',
        'positive-green-pressed': '#5dd5a0',
        'positive-green-bg': '#04100a',
        'negative-red': '#ff615c',
        'negative-red-hover': '#ff887f',
        'negative-red-pressed': '#ff887f',
        'negative-red-bg': '#1e0c0b',
        'tooltip-bg': '#152a44',
        'text-default': '#d4d4d8',
        'text-selected': '#080f18',
        'text-inverted-selected': '#000',
        'text-secondary': '#a3a3a3',
        'text-tertiary': '#a3a3a3',
        'text-disabled': '#2e4665',
        'text-emphasis': '#d4d4d8',
        'text-positive-green-button': '#ddd',
        'text-negative-red-button': '#fff',
        'text-interactive': '#6683a7',
        'input-bg': '#262626',
        'input-bg-hover': '#171717',
        'input-border': '#262626',
      },
      fontFamily: {
        numeral: ['Marfa', 'Courier New', 'monospace'],
      },
      fontWeight: {
        normal: '400',
      },
      padding: {
        'l': '16px',  
        's': '8px',
        'm': '12px',
        'xl': '32px',
      },
    },
  },
  plugins: [],
}

