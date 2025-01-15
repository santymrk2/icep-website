import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Space Grotesk Variable', ...defaultTheme.fontFamily.sans],
			},
			boxShadow: {
				'custom-blue': '0 0 25px rgba(42, 56, 178, 0.5)',
				'lg': '0 0 20px rgba(42, 56, 178, 0.1)',
			},
			borderRadius: {
				'xl': '3rem',
			},
			colors: {
				'custom-blue': '#2A38B2',
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwindcss-motion'),
	  ],

}