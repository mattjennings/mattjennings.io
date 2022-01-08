<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ params, fetch }) {
    const { slug } = params

    try {
      const policy = await import(`../../../policies/${slug}.md`)

      return {
        props: {
          ...policy.metadata,
          component: policy.default
        }
      }
    } catch (e) {
      return {
        status: 404,
        error: 'Post not found'
      }
    }
  }
</script>

<script>
  import { page } from '$app/stores'

  export let component
  export let title
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<article class="relative">
  <h1 class="!mt-0 !mb-2">
    <a class="!font-medium" href={$page.url.pathname}>
      {title}
    </a>
  </h1>

  <div class="relative">
    <svelte:component this={component} />
  </div>
</article>
