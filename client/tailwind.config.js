/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: { 
        "satisfy": ['Satisfy', 'cursive'] ,
        "baba": ['Bebas Neue', 'sans-serif'],
        "changa": ["Changa", 'sans-serif']

    } 
    },
  },
  plugins: [],
}

