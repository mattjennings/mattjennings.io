---
title: Rewriting my website in SvelteKit
layout: blog
created: 2021-05-03
---

<script>
import initSvelteKit from './init-sveltekit.mp4'

</script>

[SvelteKit](https://kit.svelte.dev) is an upcoming Svelte framework for creating websites. It's similar to Next.js for React, or Nuxt for Vue. It's still in beta but I wanted to give it a try with an actual project --- this website --- and see how the experience compared.

My website had been needing a fresh look. It's not that it was old --- I just didn't like it. I wrote it with Next.js which has long been my favorite React framework. It still is, but SvelteKit
might take that spot soon enough.

## Why SvelteKit?

SvelteKit by all means is Next.js but swap out React and Webpack for Svelte and [Vite](https://vitejs.dev). For me, Svelte and Vite are the two most exciting things in Javascript right now.

Svelte has been [gaining popularity](https://www.npmtrends.com/svelte) over the past year. It is mature and production-ready, but the ecosystem still has catching up to do when compared to React.

Vite is still rather bleeding edge, but I think it's only a matter of time before it becomes _the_ bundling tool to use.

In terms of features of the framework, SvelteKit can do a lot of what Next.js can. Server-side rendering, static page generating, API functions, building for serverless, pretty much all of the core features. I didn't find myself missing Next.js features at all.

## What's wrong with Next.js?

Nothing! I really enjoy Next.js. Compared to SvelteKit, it's much more mature and stable, and really shines when deployed with [Vercel](https://vercel.com) (I host just about everything there).

However, there are two things about it that have really worn on me over the last few years: React and Webpack. Let's start with React.

I really like React - it does so many things well. It's not that there's something "wrong" with it, but the more I use it the more I get annoyed with some aspects of it. I'll probably write another blog post on this, but for now I'll say that I find Svelte to be far less tedious to write (a common sentiment among React developers).

[Vite](https://vitejs.dev) is a "next generation" bundling tool. Once upon a time, so was Webpack. I appreciate everything it's done for web development but boy, it has not been an easy tool to love. I don't hate configuring it as much as some do but in terms of performance it does not scale well.

Vite scales much better and is extremely, extremely fast. Like, hot reloads less than 50ms fast. I'd recommend reading their [great writeup](https://vitejs.dev/guide/why.html) on what it does differently compared to others. TLDR; it's way faster and my MacBook is 50 degrees cooler. It's really hard to go back to Webpack.

## Starting with SvelteKit

Creating a SvelteKit project was easy:

```
npm init svelte@next my-website
```

<video src={initSvelteKit} autoplay loop />

This walked me through creating a blank project, giving me options for Typescript, eslint, prettier, etc.

Next, I wanted to use [Tailwind](https://tailwindcss.com) for styling and [mdsvex](https://mdsvex.pngwn.io) for writing markdown. [svelte-add](https://github.com/svelte-add/svelte-add) was the easiest way to do this:

```
npx svelte-add tailwindcss && npx svelte-add mdsvex
```

This added the necessary packages and config files to set both up for my blank SvelteKit project. Here's how the project looks now:

```
my-website
├── README.md
├── mdsvex.config.cjs
├── mdsvex.config.js
├── package.json
├── postcss.config.cjs
├── src
│   ├── app.html
│   ├── app.postcss
│   ├── global.d.ts
│   ├── lib
│   │   └── Example.svelte.md
│   └── routes
│       ├── $layout.svelte
│       ├── example-markdown.md
│       └── index.svelte
├── svelte.config.js
├── tailwind.config.cjs
└── tsconfig.json
```

If you've used Next.js, the structure should look familiar. The `src/routes` directory is the same as `pages`. One neat thing here that mdsvex setup is I can use a .md file _as_ a page - which is what I'm doing for this blog post.

By this point I was off to the races by creating my pages and components.

## Oh right, it's a beta

... and then I started hit some of the more unstable parts of SvelteKit. It actually didn't happen too often, but setting up this blog in particular took a lot of time. I ran into some issues with [dynamic imports](https://github.com/sveltejs/kit/issues/1326) and spent a night fiddling around with that. There weren't many resources for how to setup a blog in SvelteKit, so a lot of what I learned was pieced together from google and the [Svelte discord](https://svelte.dev/chat) (which has been immensely helpful). There's also some growing pains with the all-in approach to ES modules in both the browser and in node from SvelteKit.

## Verdict

I would not recommend using the beta in production unless you're ready to deal with constant breaking changes and bugs. It's not enough to make it impossible to use, but it's enough that it would frustrate you if you were relying on it. Until then, I'd recommend using [https://sapper.svelte.dev](Sapper) as there will be a clear migration guide to SvelteKit once it's released. Personally, I will keep using SvelteKit for my own projects but Next.js for everything else.

The last thing I'll say is that once the bugs and issues are dealt with, the developer experience is really, really nice. For example, this is the code for the [/blogs](/blogs) page:

```js
<script context="module">
  // number of blog posts per page
  const PAGE_SIZE = 10

  // parse all blog posts from ./posts directory
  // import.meta.globEager is a Vite feature
  // the metadata from .md is provided by the Svelte mdsvex plugin
  const posts = Object.entries(import.meta.globEager('./posts/**/*.md'))
    .map(([, post]) => post.metadata)
    .sort((a, b) => (a.created < b.created ? 1 : -1))

  // tell svelte kit to pre-render this page on build
  export const prerender = true

  export const load = async ({ page: { query } }) => {
    const page = parseInt(query.get('page') ?? '1')

    return {
      props: {
        // grab the current page's worth of posts
        posts: posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        page
      },
      // cache page on browser for 10 minutes
      maxage: 60 * 10
    }
  }
</script>

<script>
  import { format } from 'date-fns'
  export let posts
  export let page

  function offsetTimezone(date) {
    return new Date(new Date(date).valueOf() + new Date(date).getTimezoneOffset() * 60 * 1000)
  }
</script>

<svelte:head>
  <title>Matt Jennings | Blog</title>
</svelte:head>

<div class="flex flex-col flex-grow">
  <div class="flex-grow divide-y divide-gray-300 dark:divide-gray-700">
    {#each posts as post}
      <div class="pt-8 first:pt-0">
        <div>
          <h1 class="!mt-0 !mb-0"><a href={`/blog/${post.slug}`}>{post.title}</a></h1>
          <time>{format(offsetTimezone(new Date(post.created)), 'MMMM d, yyyy')}</time>
          •
          <span>{post.length}</span>
        </div>
        <p class="whitespace-pre-wrap">{post.preview}</p>
        <a href={`/blog/${post.slug}`}>Read More </a>
      </div>
    {/each}
  </div>
  <!-- pagination -->
  <div class="flex justify-between">
    {#if page > 1}
      <a href={`/blog?page=${page - 1}`}>back</a>
    {:else}
      <div />
    {/if}
    {#if posts.length === PAGE_SIZE}
      <a href={`/blog?page=${page + 1}`}>next</a>
    {/if}
  </div>
</div>
```

This provides a paginated feed for all blog posts, loaded from a neighboring `./posts` directory. To me, it's crazy how much this component does for so little code. It's also not _that_ much different than how a Next.js version would look, but I think that's both a testament to the standard Next.js has set and how close SvelteKit is to it.
