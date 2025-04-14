/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			keyframes: {
				wiggle: {
				  '0%, 100%': { transform: 'rotate(-1.5deg)' },
				  '50%': { transform: 'rotate(1.5deg)' },
				}
			  },
		    animation: {
				wiggle: 'wiggle 500ms ease-in-out infinite',
			  }
		},
	},
}
