<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const url = `/blog/${page.params.slug}.json`
		const res = await import.meta.glob(`./blog/posts/${page.params.slug}.md`)
		console.log(res)
		// const res = await fetch(url)

		// console.log(page.params)
		// if (res.ok) {
		return {
			props: {
				// article: await res.json()
			}
		}
		// }

		return {
			status: 404
		}
	}
</script>

asdf
