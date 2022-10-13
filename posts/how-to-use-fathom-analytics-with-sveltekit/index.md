---
title: How to use Fathom Analytics with SvelteKit
date: 2021-06-05
updated: 2021-12-31
---

[Fathom](https://usefathom.com) is a simple, light-weight, privacy-first alternative to Google Analytics. I recently set it up with SvelteKit so I'll share with you how I did it.

Follow along with an existing SvelteKit project of your own, or [create a new one](https://kit.svelte.dev/docs#introduction-getting-started) if needed.

_If you're reading this post you're probably already using Fathom, but if you're not, you can get $10 credit by [signing up with my referral link](https://usefathom.com/ref/QAKNUF) (I promise this post isn't a shill to get referrals)._

## Getting started

First let's add [fathom-client](https://github.com/derrickreimer/fathom-client), a javascript library for interacting with Fathom:

```
npm install fathom-client
```

## Setting up Fathom & tracking page views

Next, we'll update `src/routes/__layout.svelte` to load Fathom and start tracking page views. If you don't have one in your project, create it and use the following code for its content. If you do have one, update it to look like this:

```svelte
<script>
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import { page } from '$app/stores'
  import * as Fathom from 'fathom-client'

  onMount(() => {
    Fathom.load('YOUR-SITE-ID', {
      // optional - add your website domain(s) to avoid views during development
      // includedDomains: ['example.com', 'www.example.com']
    })
  })

  // track a page view when the pathname changes
  $: $page.url.pathname, browser && Fathom.trackPageview()
</script>

<slot />
```

Replace `YOUR-SITE-ID` with your Fathom Site ID and you will start seeing page views tracked.

## Tracking goals

In order to track goals, you can import the `trackGoal` function from `fathom-client`:

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

It's safe to import and use `fathom-client` anywhere in your site, so this makes for some pretty clean usage.

## That's it!

It's worth looking through the additional options you can pass in to [Fathom.load](https://github.com/derrickreimer/fathom-client#loadsiteid-string-opts-object), but otherwise you're ready to go!
