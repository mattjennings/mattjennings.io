<script>
  import { name } from '$lib/info.js'
  import ToC from '$lib/components/ToC.svelte'
  import { afterNavigate } from '$app/navigation'
  import PostDate from '$lib/components/PostDate.svelte'

  /** @type {import('./$types').PageData} */
  export let data

  let canGoBack = false
  afterNavigate(({ from }) => {
    canGoBack = !!from
  })

  function goBack() {
    if (canGoBack) {
      history.back()
    }
  }
</script>

<svelte:head>
  <meta name="author" content={name} />
</svelte:head>

<div class="root w-full">
  <div class="hidden lg:block" />

  <div class="w-full max-w-2xl mx-auto overflow-x-hidden">
    <article>
      <header class="flex flex-col">
        <PostDate post={data.post} class="text-lg sm:text-2xl" />
        <h1 class="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-300 sm:text-5xl">
          {data.post.title}
        </h1>
      </header>

      <!-- render the post -->
      <div class="prose">
        <svelte:component this={data.component} />
      </div>
    </article>

    <div class="py-8">
      <svelte:element
        this={canGoBack ? 'button' : 'a'}
        href={canGoBack ? undefined : '/blog'}
        style:transform-origin="top 35%"
        aria-label="Go back to blog"
        on:click={goBack}
        on:keydown={goBack}
      >
        <div class="inline-flex text-5xl font-drip text-primary">
          <span>{'<'}</span>
          <span class="-mt-1 mr-4">{'-'}</span> blog
        </div>
      </svelte:element>
    </div>
  </div>

  <!-- table of contents -->
  <div class="hidden xl:block pt-10">
    <aside class="sticky hidden w-48 ml-8 xl:block top-8" aria-label="Table of Contents">
      <ToC post={data.post} />
    </aside>
  </div>
</div>

<style lang="postcss">
  .root {
    display: grid;
    grid-template-columns: 1fr;
  }

  @media screen(lg) {
    .root {
      grid-template-columns: 1fr 42rem 1fr;
    }
  }
</style>
