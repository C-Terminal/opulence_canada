/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class', // Enable class-based dark mode
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
	  extend: {
		fontFamily: {
		  sans: ['Inter', 'sans-serif'],
		  montserrat: ['Inter', 'sans-serif'],
		},
		colors: {
			text: {
				primary: 'var(--color-text-primary)',
				secondary: 'var(--color-text-secondary)',
				tertiary: 'var(--color-text-tertiary)',
			},
		  // Map CSS variables to Tailwind colors
		  background: 'var(--color-background)',
		  surface: 'var(--color-surface)',
		  'surface-variant': 'var(--color-surface-variant)',
		  'on-surface': 'var(--color-on-surface)',
		  'on-surface-muted': 'var(--color-on-surface-muted)',
		  border: 'var(--color-border)',
		  'border-light': 'var(--color-border-light)',
		  
		  primary: {
			DEFAULT: 'var(--color-primary)',
			light: 'var(--color-primary-light)',
			dark: 'var(--color-primary-dark)',
		  },
		  secondary: {
			DEFAULT: 'var(--color-secondary)',
			light: 'var(--color-secondary-light)',
			dark: 'var(--color-secondary-dark)',
		  },
		  accent: {
			DEFAULT: 'var(--color-accent)',
			light: 'var(--color-accent-light)',
			dark: 'var(--color-accent-dark)',
		  },
		  warning: {
			DEFAULT: 'var(--color-warning)',
			light: 'var(--color-warning-light)',
			dark: 'var(--color-warning-dark)',
		  },
		  danger: {
			DEFAULT: 'var(--color-danger)',
			light: 'var(--color-danger-light)',
			dark: 'var(--color-danger-dark)',
		  },
		  success: {
			DEFAULT: 'var(--color-success)',
			light: 'var(--color-success-light)',
			dark: 'var(--color-success-dark)',
		  },
		  info: {
			DEFAULT: 'var(--color-info)',
			light: 'var(--color-info-light)',
			dark: 'var(--color-info-dark)',
		  },
		  
		  // Fintech specific colors
		  'fintech-dark': 'var(--color-fintech-dark)',
		  'fintech-muted': 'var(--color-fintech-muted)',
		  'fintech-dark-gray': 'var(--color-fintech-dark-gray)',
		  'fintech-gray': 'var(--color-fintech-gray)',
		  'fintech-light-gray': 'var(--color-fintech-light-gray)',
		  'fintech-white': 'var(--color-fintech-white)',
		  'fintech-accent': 'var(--color-fintech-green)',
		  'fintech-yellow': 'var(--color-fintech-yellow)',
		  'fintech-warn': 'var(--color-fintech-warn)',
		  'fintech-blue': 'var(--color-fintech-blue)',
		  'fintech-teal': 'var(--color-fintech-teal)',
		  'fintech-green': 'var(--color-fintech-green)',
		},
		borderRadius: {
		  'sm': '0.25rem',
		  DEFAULT: '0.375rem',
		  'md': '0.5rem',
		  'lg': '0.75rem',
		  'xl': '1rem',
		  '2xl': '1.5rem',
		},
		boxShadow: {
		  'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
		  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
		  'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
		  'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
		  'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
		  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
		  'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
		  'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
		  'dark': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
		  'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
		  'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
		  'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
		  'dark-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
		  'dark-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
		},
		animation: {
		  'fade-in': 'fadeIn 0.3s ease-in-out',
		  'fade-out': 'fadeOut 0.3s ease-in-out',
		  'slide-in': 'slideIn 0.3s ease-in-out',
		  'slide-out': 'slideOut 0.3s ease-in-out',
		},
		keyframes: {
		  fadeIn: {
			'0%': { opacity: '0' },
			'100%': { opacity: '1' },
		  },
		  fadeOut: {
			'0%': { opacity: '1' },
			'100%': { opacity: '0' },
		  },
		  slideIn: {
			'0%': { transform: 'translateY(10px)', opacity: '0' },
			'100%': { transform: 'translateY(0)', opacity: '1' },
		  },
		  slideOut: {
			'0%': { transform: 'translateY(0)', opacity: '1' },
			'100%': { transform: 'translateY(10px)', opacity: '0' },
		  },
		},
	  },
	},

	plugins: ['daisyUI']
};
