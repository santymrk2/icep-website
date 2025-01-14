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
				sans: ['Poppins', ...defaultTheme.fontFamily.sans],
			},
		},
		dropShadow: {
			'3xl': '0 0 15px rgb(30, 58, 138)',
			'4xl': [
				'0 35px 35px rgba(0, 0, 0, 0.25)',
				'0 45px 65px rgba(0, 0, 0, 0.15)'
			]
		  }
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwindcss-motion'),
	  ],

}
