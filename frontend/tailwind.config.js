/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: { // setting screen break points
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      backgroundImage:{
        // 'home-bg1': "url('/src/assets/images/bg-image.jpg')",
        'home-bg': "url('/src/assets/images/home-bg2.jpg')",
        'home-bg2': "url('/src/assets/images/bg-image2.jpg')",
      }
    },
  },
  plugins: [],
}

