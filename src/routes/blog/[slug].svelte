<!-- 
  This page just renders the post at /blog/[slug] rather than /blog/post/[slug]
-->
<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const res = await import(`./posts/${page.params.slug}/index.md`)

    return {
      props: {
        component: res.default
      },
      // 10 minutes
      maxage: 60 * 10
    }
  }

</script>

<script>
  export let component

</script>

<svelte:component this={component} />
