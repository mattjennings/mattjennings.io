<script>
  import { name } from '$lib/info.js'
  import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte'
  import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte'
  import PostsList from '$lib/components/PostsList.svelte'

  /** @type {import('./$types').PageData} */
  export let data

  $: isFirstPage = data.page === 1
  $: hasNextPage = data.posts[data.posts.length - 1]?.previous
</script>

<svelte:head>
  <title>{name} | Blog</title>
</svelte:head>

<div class="flex flex-col flex-grow">
  <!-- <header class="pt-4">
    <h1
      class="text-4xl sm:text-5xl font-bold tracking-wide font-drip text-cyan-500 dark:text-pink-300"
    >
      blog
    </h1>
  </header> -->

  <div class="mt-4">
    <PostsList posts={data.posts} />
  </div>

  <!-- pagination -->
  <div class="flex items-center justify-between pt-16 pb-8">
    {#if !isFirstPage}
      <a href={`/blog/page/${data.page - 1}`} data-sveltekit-prefetch>
        <ArrowLeftIcon class="w-4 h-4" />
        Previous
      </a>
    {:else}
      <div />
    {/if}

    {#if hasNextPage}
      <a href={`/blog/page/${data.page + 1}`} data-sveltekit-prefetch
        >Next
        <ArrowRightIcon class="w-4 h-4" />
      </a>
    {/if}
  </div>
</div>

<style>
  a {
    @apply flex items-center gap-2 font-medium text-zinc-700;
  }

  :global(.dark) a {
    @apply text-zinc-300;
  }
</style>
