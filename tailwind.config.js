/** @type {import('tailwindcss').Config} */

const { FONT_VAR, COLORS } = require('./constants/style.ts');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    container: {
      center: true
    },
    fontSize: {
      "xxs": ".6875rem",
      "xs": ".75rem",
      "sm": ".89rem",
      "tiny": "0.94rem",
      "base": "1rem",
      "lg": "1.09rem",
      "2lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.45rem",
      "5xl": "2.75rem",
      "6xl": "3.4rem",
      "7xl": "4rem",
      "8xl": "5rem",
    },
    colors: {...COLORS},
    screens: {
      'xxs': '390px',
      'xs': '475px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1600px',
      '4xl': '2100px'
    },
    extend: {
      fontFamily: {
        sans: [`var(${FONT_VAR})`]
      },
      gridRowStart: {
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
      }
    },
  },
  plugins: [],
}
