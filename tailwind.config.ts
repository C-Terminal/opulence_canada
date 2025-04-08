/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    darkMode: 'class', // Enable dark mode via class
    theme: {
      extend: {
        colors: {
          // Define a futuristic color palette (example)
          'primary': {
            DEFAULT: '#6B46C1', // Purple
            'light': '#9F7AEA',
            'dark': '#5B21B6'
          },
          'secondary': {
            DEFAULT: '#0BC5EA', // Cyan
            'light': '#76E4F7',
            'dark': '#0E7490'
          },
          'background': {
            light: '#F7FAFC', // Off-white for light mode
            dark: '#121826',   // Very dark blue/grey for dark mode
            'dark-secondary': '#1A202C' // Slightly lighter dark
          },
          'text': {
            light: '#1A202C', // Dark grey for light mode text
            dark: '#E2E8F0',  // Light grey for dark mode text
            'dark-muted': '#A0AEC0' // Muted text for dark mode
          },
          'accent': '#F56565', // Red/Error accent
        },
        fontFamily: {
          // Choose modern, clean fonts
          sans: ['Inter', 'sans-serif'], // Example: Inter
        },
        // Add other theme extensions: spacing, animations, etc.
      },
    },
    plugins: [],
  }