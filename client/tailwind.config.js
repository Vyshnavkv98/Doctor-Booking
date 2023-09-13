/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,tsx,jsx}",

  ],
  theme: {
    extend: {
      height: {
        '128': '32rem',
      },
      colors:{
        "dark-purple":"#171c99",
        "grey-shade":"#f0f0f5",
        'light-white':'rgba(255,255,255,0.18)',
        "light-grey":"#EEEEEE",
         "customSidebarColor": '#081A51'
      }

  },
  plugins: [],
}
}
