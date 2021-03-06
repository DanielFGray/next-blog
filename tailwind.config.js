/* eslint-disable */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  purge: {
    content: [
      './pages/**/*.tsx',
      './components/**/*.tsx',
      './pages/**/*.css',
    ],
  },
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        teal: colors.teal,
        rose: colors.rose,
        lightBlue: colors.lightBlue,
        coolGray: colors.coolGray,
        gray: colors.trueGray,
      },
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              pre: {
                color: theme('colors.gray.900'),
                backgroundColor: theme('colors.gray.100'),
              },
            },
          },
          dark: {
            css: {
              color: theme('colors.gray.300'),
              '[class~="lead"]': { color: theme('colors.gray.400') },
              a: { color: theme('colors.gray.100') },
              strong: { color: theme('colors.gray.100') },
              'ul > li::before': { backgroundColor: theme('colors.gray.700') },
              hr: { borderColor: theme('colors.gray.900'), },
              blockquote: {
                color: theme('colors.gray.100'),
                borderLeftColor: theme('colors.gray.500'),
              },
              h1: { color: theme('colors.gray.100') },
              h2: { color: theme('colors.gray.100') },
              h3: { color: theme('colors.gray.100') },
              h4: { color: theme('colors.gray.100') },
              code: { color: theme('colors.gray.300') },
              'a code': { color: theme('colors.gray.300'), textDecoration: 'underline' },
              hr: { borderColor: theme('colors.gray.500') },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.900'),
              },
              thead: {
                color: theme('colors.gray.100'),
                borderBottomColor: theme('colors.gray.700'),
              },
              'tbody tr': { borderBottomColor: theme('colors.gray.800') },
            },
          },
        }
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus'],
      typography: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
