const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: { 
        "satisfy": ['Satisfy', 'cursive'],
        "baba": ['Bebas Neue', 'sans-serif'],
        "changa": ["Changa", 'sans-serif']
      },
      backgroundImage: {
        'intro-img': "url('/src/assets/images/broguewallpaper.jpg')",
        'layer-img': "url('/src/assets/images/layerbg1.jpg')",
        'layer-w-heel': "url('/src/assets/images/womanheels.jpg')",
        'profile': "url('/src/assets/images/default-user-img.png')",
      },
      keyframes: {
        blink: {
          '0%, 50%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1s infinite',
      },
    },
  },
  plugins: [],
}