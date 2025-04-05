import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ailancy: {
          DEFAULT: '#06845E',
          '50': '#e6f3ef',
          '100': '#cde7df',
          '200': '#9bd0bf',
          '300': '#69b89f',
          '400': '#37a17f',
          '500': '#06845E',
          '600': '#056a4b',
          '700': '#045038',
          '800': '#033625',
          '900': '#011c13',
          '950': '#000e07',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config; 