<!-- 
  Renders the post at /blog/[slug]
-->
<script context="module">
  import { isBefore } from 'date-fns'

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page }) {
    const res = await import(`../../../posts/${page.params.slug}/index.md`)

    if (!isBefore(new Date(res.metadata.created), new Date())) {
      return {
        props: {},
        redirect: '/404',
        status: 307
      }
    }
    return {
      props: {
        // frontmatter data from post
        ...res.metadata,

        // the processed Svelte component from mdsvex
        component: res.default
      },
      // 10 minutes
      maxage: 60 * 10
    }
  }

</script>

<script>
  import { format } from 'date-fns'
  import ButtonLink from '$lib/components/ButtonLink.svelte'

  export let component

  export let title
  export let created
  export let preview
  export let length
  export let slug

  function fixTimezone(date) {
    return new Date(new Date(date).valueOf() + new Date(date).getTimezoneOffset() * 60 * 1000)
  }

  const ogImage = `https://og.mattjennings.io/${encodeURIComponent(title)}.png?md=1&fontSize=100px`

</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={preview} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={`https://mattjennings.io/blog/${slug}`} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={preview} />
  <meta property="og:image" content={ogImage} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="https://mattjennings.io" />
  <meta property="twitter:url" content={`https://mattjennings.io/blog/${slug}`} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={preview} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<article>
  <h1 class="!mt-0 !mb-1">{title}</h1>
  <div>
    <time>{format(fixTimezone(created), 'MMMM d, yyyy')}</time>
    •
    <span>{length}</span>
  </div>
  <svelte:component this={component} />
</article>

<div class="pt-12 flex justify-start">
  <ButtonLink isBack href="/blog">Blog Posts</ButtonLink>
</div>
