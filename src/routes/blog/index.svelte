<script context="module">
  export const load = async () => {
    const posts = Object.entries(import.meta.globEager('/posts/**/*.md'))
      // get post metadata
      .map(([, post]) => post.metadata)
      // sort by date
      .sort((a, b) => (a.date < b.date ? 1 : -1))

    return {
      props: {
        posts
      }
    }
  }
</script>

<script>
  import ButtonLink from '$lib/components/ButtonLink.svelte'
  import { format } from 'date-fns'

  export let posts
</script>

<svelte:head>
  <title>Matt Jennings | Blog</title>
</svelte:head>

<div class="flex flex-col flex-grow">
  <div class="flex-grow divide-y divide-gray-300 dark:divide-gray-700">
    {#each posts as post}
      <div class="py-8 first:pt-0">
        <div>
          <h1 class="!mt-0 !mb-1"><a href={`/blog/${post.slug}`}>{post.title}</a></h1>
          <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          •
          <span>{post.readingTime.text}</span>
        </div>
        <div>{@html post.previewHtml}</div>
        <div class="flex justify-end w-full">
          <ButtonLink href={`/blog/${post.slug}`}>Read More</ButtonLink>
        </div>
      </div>
    {/each}
  </div>
</div>
