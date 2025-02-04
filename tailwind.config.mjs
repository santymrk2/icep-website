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
				sans: ['Noto Sans Variable', ...defaultTheme.fontFamily.sans],
				serif: ['Merriweather', ...defaultTheme.fontFamily.serif],

			},
			dropShadow: {
				'custom-blue': '0 0 20px rgba(42, 56, 178, 0.5)',
				'lg': '0 0 20px rgba(42, 56, 178, 0.1)',
			},
			boxShadow: {
				'custom-blue': '0 0 15px -5px rgba(42, 56, 178, 0.5)',
				'lg': '0 0 20px rgba(42, 56, 178, 0.1)',
			},
 
			colors: {
				'custom-blue': '#2A38B2',
				'custom-teal': '#0180f1',
			},
			animation: {
				tilt: 'tilt 10s infinite linear',
				'infinite-scroll': 'infinite-scroll 25s linear infinite',
				float: 'float 3s ease-in-out infinite',
				float3d: 'float3d 6s ease-in-out infinite',


			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
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
				},
				'infinite-scroll': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-100%)' },
				},
				float3d: {
					'0%, 100%': {
						transform: 'perspective(1000px) translateZ(20px) rotateX(3deg) rotateY(3deg)'
					},
					'50%': {
						transform: 'perspective(1000px) translateZ(30px) rotateX(-3deg) rotateY(-3deg)'
					}
				}


			},

		},
	},

	plugins: [
		require('@tailwindcss/typography'),
		function ({ addUtilities }) {
			addUtilities({
				'.no-scrollbar': {
					'-ms-overflow-style': 'none',  /* Internet Explorer 10+ */
					'scrollbar-width': 'none',     /* Firefox */
				},
				'.no-scrollbar::-webkit-scrollbar': {
					'display': 'none',             /* WebKit browsers */
				},
			});
		},
	],

}