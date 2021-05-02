module.exports = {
	layout: './src/routes/$md.svelte',
	extensions: ['.svx', '.md'],
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [require('remark-abbr')],
	rehypePlugins: [
		require('rehype-slug'),
		[
			require('rehype-autolink-headings'),
			{
				behavior: 'wrap'
			}
		]
	]
}
