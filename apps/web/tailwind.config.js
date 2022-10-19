const tailwindColors = require('tailwindcss/colors');
const colors = require('./tailwind.colors');

function fallbackFont(font) {
   return [
      font,
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'Noto Sans',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
   ];
}

module.exports = {
   mode: 'jit',
   content: ['./src/**/*.{ts,tsx}'],
   theme: {
      fontFamily: {
         inter: fallbackFont('Inter var'),
         satoshi: fallbackFont('Satoshi-Variable'),
      },
      extend: {
         colors: {
            ...colors,
            ...tailwindColors,
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [],
};
