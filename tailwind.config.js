/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sml: '560px',
        '3xl': '1872px',
        mdl: '880px',
      },
      container: {
        center: true,
      },
      colors: {
        primary: '#EF2B34',
        primary700: '#B40008',
        secondary50: '#D7D7D7',
        secondary500: '#717171',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '376px',
          '@screen sm': {
            maxWidth: '500px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '1024px',
          },
          '@screen xl': {
            maxWidth: '1280px',
          },
          '@screen 2xl': {
            maxWidth: '1536px',
          },
        },
      });
    },
  ],
};
