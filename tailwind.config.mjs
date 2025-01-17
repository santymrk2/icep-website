import { transformer } from 'astro:schema'
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
				'custom-teal': '#0180f1',
			},
			animation: {
				tilt: 'tilt 10s infinite linear'
			},
			keyframes:{
				tilt: {
					"0%, 50%, 100%": {
						transform: "rotate(0deg)",
					},
					"25%": {
						transform: "rotate(1deg)",
					},
					"75%": {
						transform: "rotate(-1deg)"
					}
				}
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwindcss-motion'),
	  ],

}