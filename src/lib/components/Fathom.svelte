<script>
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import { page } from '$app/stores'
  import * as Fathom from 'fathom-client'

  onMount(() => {
    Fathom.load('IDGMCFHT', {
      url: 'https://cdn.usefathom.com/script.js',
      includedDomains: ['mattjennings.io']
    })
  })

  $: $page.url.pathname, browser && Fathom.trackPageview()
</script>
