<script>
  import '../app.css'
  import '../prism.css'
  import MoonIcon from 'heroicons-svelte/solid/MoonIcon.svelte'
  import SunIcon from 'heroicons-svelte/solid/SunIcon.svelte'
  import { browser } from '$app/environment'
  import { name } from '$lib/info'
  import Fathom from '../lib/components/Fathom.svelte'
  import Lazy from '$lib/components/Lazy.svelte'
  import Splatter from '$lib/components/Splatter.svelte'

  let isDarkMode = browser ? Boolean(document.documentElement.classList.contains('dark')) : true

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }
</script>

<Fathom />

<div class="hidden sm:block fixed right-[70vw] -top-[20vh] pointer-events-none">
  <Splatter class="fill-cyan-500 " scale={2} />
</div>
<div class="hidden sm:block fixed left-[80vw] top-[10vh] pointer-events-none">
  <Splatter class="fill-pink-500" scale={3} />
</div>

<div class="flex flex-col min-h-screen">
  <div class="flex flex-col flex-grow w-full px-4 py-2">
    <header class="flex items-center justify-between w-full max-w-2xl py-4 mx-auto lg:pb-8">
      <a class="header text-lg font-bold sm:text-2xl text-pink-500 dark:text-cyan-500" href="/">
        {name}
      </a>

      <button
        type="button"
        role="switch"
        aria-label="Toggle Dark Mode"
        aria-checked={isDarkMode}
        class="w-4 h-4 sm:h-8 sm:w-8 sm:p-1"
        on:click={() => {
          isDarkMode = !isDarkMode
          localStorage.setItem('isDarkMode', isDarkMode.toString())

          disableTransitionsTemporarily()

          if (isDarkMode) {
            document.querySelector('html').classList.add('dark')
          } else {
            document.querySelector('html').classList.remove('dark')
          }
        }}
      >
        <MoonIcon class="hidden text-pink-100 dark:block" />
        <SunIcon class="block text-cyan-500 dark:hidden" />
      </button>
    </header>
    <main class="flex flex-col flex-grow w-full max-w-2xl mx-auto" data-sveltekit-prefetch>
      <slot />
    </main>
  </div>
</div>

<style>
  .header {
    font-family: 'Ressurrec', ui-sans-serif, system-ui, -apple-system;
  }
</style>
