const { mdsvex } = require('mdsvex')
const mdsvexConfig = require('./mdsvex.config.cjs')
const preprocess = require('svelte-preprocess')
const vercel = require('@sveltejs/adapter-vercel')
/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [mdsvex(mdsvexConfig), [preprocess()]],

	kit: {
		adapter: vercel(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
}
