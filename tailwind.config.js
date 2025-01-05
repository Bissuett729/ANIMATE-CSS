/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0079e5',
        layout: '#191919',
        main: '#141414'
      },
      boxShadow: {
        menuActive : '0 0 13px -4px #CAFF33',
        shadowSide : '0px 0px 13px -4px black',
      }
    },
    backgroundImage: {
      gradientBlue: 'linear-gradient(90deg, rgb(2 0 36 / 7%) 0%, rgb(0 108 204 / 32%) 50%, rgb(0 121 229 / 23%) 100%)',
      gradientCardBlue: 'linear-gradient(48deg, rgb(0 121 229 / 0%) 40%, rgb(0 121 229 / 7%) 100%)',
    }
  },
  plugins: [],
}