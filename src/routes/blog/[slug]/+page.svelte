<script>
  import { format, parseISO } from 'date-fns'
  import { name, bio } from '$lib/info.js'
  import ToC from '$lib/components/ToC.svelte'
  import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte'
  import SocialLinks from '$lib/components/SocialLinks.svelte'
  import { afterNavigate } from '$app/navigation'

  /** @type {import('./$types').PageData} */
  export let data

  let canGoBack = false
  afterNavigate(({ from }) => {
    // only show back button if we navigated from within the site
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

<div class="flex">
  <div class="relative w-full max-w-2xl">
    <svelte:element
      this={canGoBack ? 'button' : 'a'}
      href={canGoBack ? undefined : '/blog'}
      class="absolute items-center justify-center hidden lg:flex -left-16"
      aria-label="Go back to blog"
      on:click={goBack}
      on:keydown={goBack}
    >
      <span class="text-8xl font-drip text-pink-400 dark:text-pink-300">{'<'}</span>
    </svelte:element>

    <article>
      <header class="flex flex-col">
        <h1 class="text-4xl font-bold tracking-tight text-cyan-500 dark:text-pink-300 sm:text-5xl">
          {data.post.title}
        </h1>
        <div class="flex items-center pt-2 text-base text-zinc-400 dark:text-zinc-500">
          <time dateTime={data.post.date}>
            <span>{format(new Date(parseISO(data.post.date)), 'MMMM d, yyyy')}</span>
          </time>
          <span class="mx-2">•</span>
          <span>{data.post.readingTime}</span>
        </div>
      </header>

      <!-- render the post -->
      <div class="prose">
        <svelte:component this={data.component} />
      </div>
    </article>

    <hr />
    <div class="prose pb-8">
      <p>
        {@html bio}
      </p>
      <p>
        <a href="/blog"><ArrowLeftIcon class="w-4 inline mr-2" />Check out some of my other posts</a
        >
      </p>
      <div class="flex justify-center gap-6">
        <SocialLinks />
      </div>
    </div>
  </div>
  <!-- table of contents -->
  <div class="hidden xl:block">
    <aside class="sticky hidden w-48 ml-8 xl:block top-8" aria-label="Table of Contents">
      <ToC post={data.post} />
    </aside>
  </div>
</div>
