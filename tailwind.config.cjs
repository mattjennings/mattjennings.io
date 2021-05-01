module.exports = {
	mode: 'jit',
	darkMode: 'media',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography')]
}
