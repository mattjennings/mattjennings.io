<script>
  import clsx from 'clsx'
  import { page } from '$app/stores'

  let _class = undefined
  export let href
  export { _class as class }

  let active
  let linkClass

  // update active on navigation change
  $: $page, update()

  // make sure active is set for SSR
  update()

  function update() {
    const [, path] = $page.url.pathname.split('/')
    const [, _href] = href.split('/')

    active = (!_href && !path) || (_href && path && _href.startsWith(path))
    linkClass = active
      ? 'text-lg font-bold sm:text-2xl text-slate-800 dark:text-white'
      : 'text-base font-medium sm:text-xl text-slate-500 dark:text-white dark:opacity-80'
  }
</script>

<a
  {href}
  sveltekit:prefetch
  class={clsx(
    _class,
    linkClass,
    `hover:text-slate-800 dark:hover:text-slate-100`,
    `transform transition-all`
  )}
>
  <slot />
</a>
