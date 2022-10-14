<script>
  import PostsList from '$lib/components/PostsList.svelte'
  import SocialLinks from '$lib/components/SocialLinks.svelte'
  import { bio } from '$lib/info.js'

  /** @type {import('./$types').PageData} */
  export let data
</script>

<div class="flex flex-col flex-grow gap-8 pb-16">
  <!-- bio -->
  <section class="flex flex-col items-center gap-16 pb-16">
    <div class="flex flex-col w-full gap-6 rounded-lg">
      <div class="prose ">
        <p class="text-base text-zinc-600 dark:text-zinc-400 mt-0">
          {@html bio}
        </p>
        <p>
          Some of my work includes a hockey news app, a Megaman X fan game, and various open source
          libraries. <a href="/projects">Check them out!</a>
        </p>
      </div>
      <div class="flex justify-center gap-6">
        <SocialLinks />
      </div>
    </div>
  </section>
  <section class="w-full">
    <div class="flex items-center justify-between gap-4 mb-8">
      <a
        href="/blog"
        class="text-4xl -rotate-3 sm:text-5xl font-drip text-cyan-500 dark:text-pink-300">blog -></a
      >
    </div>
    <PostsList posts={data.posts} />
  </section>
</div>
