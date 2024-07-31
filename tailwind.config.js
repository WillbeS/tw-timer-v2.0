/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        willbeblue: {
          200: '#6BBAEC',
          400: '#5695BD',
          500: '#40708E',
          600: '#2B4A5E',
          700: '#203847',
        },
        tw: {
          black: '#1F0806',
          brown: '#804E3E',
          brown200: '#C09464',
          greenbrown: '#564D3D',
          greenblue: '#8D9585',
          light: '#D4C8B2',
          orange: '#C3A66F',
          yellow: '#D1B987',
          orange100: '#E9DBB9',
          yellow100: '#F2E4C0',
        },
        dark: {
          primary900: '#0d1b2a',
          primary800: '#1b263b',
          primary700: '#415a77',
          primary500: '#778da9',
          primary300: '#adbbcb',
          light100: '#e0e1dd',
        },
      },
    },
  },
  plugins: [],
};
