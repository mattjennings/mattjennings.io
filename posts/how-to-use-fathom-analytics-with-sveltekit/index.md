---
title: How to use Fathom Analytics with SvelteKit
created: 2021-06-05
---

[Fathom](https://usefathom.com) is a simple, light-weight, privacy-first alternative to Google Analytics. I decided to set it up with this website (which uses SvelteKit) and thought I would share how you can too.

If you're reading this post you're probably already using Fathom, but if you're not, you can get $10 credit by [signing up with my referral link](https://usefathom.com/ref/QAKNUF) (much appreciated if you do, and I promise this post isn't a shill to get referrals).

Follow along with an existing SvelteKit project of your own, or [create a new one](https://kit.svelte.dev/docs#introduction-getting-started) if needed.

## Getting started

First let's add [fathom-client](https://github.com/derrickreimer/fathom-client):

```
npm install fathom-client
```

## Tracking page views

We'll be updating `src/routes/__layout.svelte` to set up Fathom and start tracking page views. If you don't have one in your project, create it and use the following code for its content. If you do have one, update it to look like this:

```svelte
<!-- __layout.svelte -->
<script>
  import { onMount } from 'svelte'
  import { browser } from '$app/env'
  import { page } from '$app/stores'
  import * as Fathom from 'fathom-client'

  onMount(() => {
    Fathom.load('YOUR-SITE-ID', {
      // optional - add your website domain(s) to avoid views during development
      // includedDomains: ['example.com', 'www.example.com']
    })
  })

  // track a page view when the page changes
  $: $page.path, browser && Fathom.trackPageview()
</script>

<slot />
```

Replace `YOUR-SITE-ID` with your Fathom Site ID and you will start seeing page views tracked.

## Tracking goals

Now that Fathom is configured in our layout, we can use `fathom-client` anywhere in our app. For tracking goals, you could do something like this:

```svelte
<script>
  import { trackGoal } from 'fathom-client'

  function purchase() {
    trackGoal('YOUR-GOAL-ID', 100)
  }
</script>

<button on:click={purchase}>
  Buy Awesome Product
</button>
```

## That's it!

It's worth looking through the additional options you can pass in to [Fathom.load](https://github.com/derrickreimer/fathom-client#loadsiteid-string-opts-object), but otherwise you're ready to go!
