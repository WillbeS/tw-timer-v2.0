/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        gradient: {
          // red500: '#8e1e0e',
          // red600: '#8a1605',
          // red700: '#5c0303',
          // red800: '#500101',
          // red900: '#3c0000',
          // green600: '#05798A',
          // blue400: '#BCCCF4',
          // orange50: '#f4e4bc',
          // orange100: '#e7d9b8',
          // orange200: '#e3c788',
          // orange300: '#dcba78',
          // orange400: '#a0744d',
          // orange450: '#956c48',
        },
        tw: {
          black: '#1F0806',
          brown: '#804E3E',
          // brown200: '#C09464',
          greenblue: '#8D9585',
          light: '#D4C8B2',
          // orange: '#C3A66F',
          // yellow: '#D1B987',
          // orange100: '#E9DBB9',
          // yellow100: '#F2E4C0',

          red600: '#8a1605',
          red700: '#5c0303',
          red800: '#500101',
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
