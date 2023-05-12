/** @type {import('tailwindcss').Config} */

const { resolve } = require('path')
const colorsPath = resolve(__dirname, 'src/styles/theme.ts')
const colors = require(colorsPath)

module.exports = {
  // jit にしないと 通常の方法でスタイリングするっぽい
  // → 大量の未使用cssが残る可能性あり
  mode: 'jit',
  purge: ['./src/**/*.tsx'],
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // local storage で theme を参照
  theme: {
    colors: colors,
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  variants: {
    backdropBlur: ['responsive'],
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
