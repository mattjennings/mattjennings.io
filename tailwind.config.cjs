const colors = require('tailwindcss/colors')

module.exports = {
	mode: 'jit',
	darkMode: 'media',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'light-blue': colors.lightBlue,
				cyan: colors.cyan
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						ul: {
							marginTop: '0 !important',
							marginBottom: '0 !important'
						},
						li: {
							marginTop: '0 !important',
							marginBottom: '0 !important'
						},

						img: {
							marginLeft: 'auto',
							marginRight: 'auto'
						},
						'h1,h2,h3,h4,h5,h6': {
							a: {
								textDecoration: 'none'
							}
						}
					}
				},
				light: {
					css: [
						{
							color: theme('colors.gray.400'),
							'[class~="lead"]': {
								color: theme('colors.gray.300')
							},
							a: {
								color: theme('colors.gray.200')
							},
							strong: {
								color: theme('colors.white')
							},
							'ol > li::before': {
								color: theme('colors.gray.400')
							},
							'ul > li::before': {
								backgroundColor: theme('colors.gray.600')
							},
							hr: {
								borderColor: theme('colors.gray.200')
							},
							blockquote: {
								color: theme('colors.gray.200'),
								borderLeftColor: theme('colors.gray.600')
							},
							h1: {
								color: theme('colors.white')
							},
							h2: {
								color: theme('colors.white')
							},
							h3: {
								color: theme('colors.white')
							},
							h4: {
								color: theme('colors.white')
							},
							'figure figcaption': {
								color: theme('colors.gray.400')
							},
							code: {
								color: theme('colors.white')
							},
							'a code': {
								color: theme('colors.white')
							},
							pre: {
								color: theme('colors.gray.200'),
								backgroundColor: theme('colors.gray.800')
							},
							thead: {
								color: theme('colors.white'),
								borderBottomColor: theme('colors.gray.400')
							},
							'tbody tr': {
								borderBottomColor: theme('colors.gray.600')
							}
						}
					]
				}
			})
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
