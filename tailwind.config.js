/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: " 'Poppins', sans-serif ",
        sfPro: 'SF Pro Display',
      },
      colors: {
        primaryColor: '#F33',
      },
      screens: {
        sm: '360px',
        md: '480px',
        lg: '1200px',
      },
      rotate: {
        15: '15deg',
        30: '30deg',
        60: '60deg',
        '-15': '-15deg',
        '-30': '-30deg',
        '-60': '-60deg',
      },
    },
  },
  plugins: [],
};
