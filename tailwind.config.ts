import type { Config } from 'tailwindcss'

const twColors = require('tailwindcss/colors')

const colors ={
    primary: '#f45454',
    secondary: '#b55904',
    bgColor: '#ececec',
    gray: twColors.gray,
    blue: twColors.blue,
    transparent: twColors.transparent
}

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors,
    container: {
      center: true
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
