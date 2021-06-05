<script>
  import { onMount } from 'svelte'
  import { browser } from '$app/env'
  import { page } from '$app/stores'
  import * as Fathom from 'fathom-client'

  onMount(() => {
    Fathom.load('IDGMCFHT', {
      url: 'https://wasp.mattjennings.io/script.js',
      includedDomains: ['mattjennings.io']
    })
  })

  $: $page.path, browser && Fathom.trackPageview()

</script>
