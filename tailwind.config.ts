/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        custom: ['integralcf', 'sans-serif'],
      },
      screens: {
        xsm: { max: '500px' },
      },
    },
  },
  plugins: [],
};
