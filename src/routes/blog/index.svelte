<script context="module">
  const PAGE_SIZE = 10

  const posts = Object.entries(import.meta.globEager('./posts/**/*.md'))
    .map(([, post]) => post.metadata)
    .sort((a, b) => (a.created < b.created ? 1 : -1))

  export const prerender = true

  export const load = async ({ page: { query } }) => {
    const page = parseInt(query.get('page') ?? '1')

    return {
      props: {
        posts: posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        page
      },
      // cache page for 10 minutes
      maxage: 60 * 10
    }
  }
</script>

<script>
  import { format } from 'date-fns'
  export let posts
  export let page

  function offsetTimezone(date) {
    return new Date(new Date(date).valueOf() + new Date(date).getTimezoneOffset() * 60 * 1000)
  }
</script>

<svelte:head>
  <title>Matt Jennings | Blog</title>
</svelte:head>

<div class="flex flex-col flex-grow">
  <div class="flex-grow divide-y divide-gray-300 dark:divide-gray-700">
    {#each posts as post}
      <div class="pt-8 first:pt-0">
        <div>
          <h1 class="!mt-0 !mb-0"><a href={`/blog/${post.slug}`}>{post.title}</a></h1>
          <time>{format(offsetTimezone(new Date(post.created)), 'MMMM d, yyyy')}</time>
          •
          <span>{post.length}</span>
        </div>
        <p class="whitespace-pre-wrap">{post.preview}</p>
        <a href={`/blog/${post.slug}`}>Read More </a>
      </div>
    {/each}
  </div>
  <!-- pagination -->
  <div class="flex justify-between">
    {#if page > 1}
      <a href={`/blog?page=${page - 1}`}>back</a>
    {:else}
      <div />
    {/if}
    {#if posts.length === PAGE_SIZE}
      <a href={`/blog?page=${page + 1}`}>next</a>
    {/if}
  </div>
</div>
