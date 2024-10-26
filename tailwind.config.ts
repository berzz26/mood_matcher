/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        spotify: '#1DB954',
        'spotify-hover': '#1ED760',
        'apple-music': '#FA243C',
        'apple-music-hover': '#FB3E52',
      },
    },
  },
  plugins: [],
}