/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend:{
      fontFamily:{
        'akshar':['Akshar', 'sans-serif'],
        'plaster':['Plaster']
      },
      colors: {
        'brown-high': '#C09373',
      },
      
    },
  plugins: [],
}
}