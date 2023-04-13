/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
      },
      colors: {
        'tw-black': '#090C02',
        'tw-white': '#fcfcfc',
        'tw-blue': '#476c9b',
        'tw-navy-blue': '#2c3e50',
        'tw-salmon': 'f8b195',
        'tw-eggplant': '#6c5b7b',
        'tw-purple': '#8e44ad',
        'tw-yellow': '#f7dc6f',
        'tw-lavender': '#E6E6FA',
        'tw-pale-pink': '#FFC6D9',
        'tw-pale-yellow': '#FFFF99',
        'tw-light-gray': '#C0C0C0',
      },
    },
  },
  plugins: [],
}
