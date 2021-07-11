<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page: { params } }) {
    // get all posts
    const posts = Object.entries(import.meta.globEager('/posts/**/*.md'))
      .map(([, post]) => ({
        // frontmatter data
        metadata: post.metadata,

        // the processed Svelte component from the markdown file
        component: post.default
      }))
      .sort((a, b) => (a.metadata.date < b.metadata.date ? 1 : -1))

    const { slug } = params
    const index = posts.findIndex((post) => slug === post.metadata.slug)

    const { metadata, component } = posts[index]

    // next/previous posts
    const next = posts[index - 1]?.metadata
    const previous = posts[index + 1]?.metadata

    return {
      props: {
        component,
        ...metadata,
        next,
        previous
      }
    }
  }
</script>

<script>
  import { format } from 'date-fns'
  import ButtonLink from '$lib/components/ButtonLink.svelte'

  export let component

  export let title
  export let date
  export let preview
  export let readingTime
  export let slug
  export let next
  export let previous

  const ogImage = `https://og.mattjennings.io/${encodeURIComponent(title)}.png?md=1&fontSize=100px`
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={preview} />
  <meta name="author" content="Matt Jennings" />

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
  <div class="back">
    <time datetime={new Date(date).toISOString()}>{format(new Date(date), 'MMMM d, yyyy')}</time>
    •
    <span>{readingTime.text}</span>
  </div>
  <svelte:component this={component} />
</article>

<div class="pt-12 flex justify-between">
  {#if previous}
    <ButtonLink isBack href={`/blog/${previous.slug}`}>{previous.title}</ButtonLink>
  {:else}
    <div />
  {/if}
  {#if next}
    <ButtonLink href={`/blog/${next.slug}`}>{next.title}</ButtonLink>
  {/if}
</div>
