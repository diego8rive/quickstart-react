/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this line
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#4b0082',
      },
      textShadow: {
        'glow': '0 0 10px rgba(200, 0, 255, 0.8)',
      },
      boxShadow: {
        'button-glow': '0 0 20px rgba(200, 0, 255, 0.6)',
        'card-hover': '0 0 15px rgba(200, 0, 255, 0.8)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'), // For text shadows
  ],
};

