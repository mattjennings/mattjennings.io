<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const res = await import(`./posts/${page.params.slug}.md`)

		return {
			props: {
				component: res.default
			}
		}
	}
</script>

<script>
	export let component
</script>

<svelte:component this={component} />
