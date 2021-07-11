---
title: Next.js vs SvelteKit
layout: blog
date: 2021-05-06
hidden: true
---

[SvelteKit](https://kit.svelte.dev) is an upcoming Svelte framework for creating websites. It's similar to Next.js for React, or Nuxt for Vue. It's still in beta but I wanted to give it a try with an actual project --- this website --- and see how the experience compared.

## Why SvelteKit?

SvelteKit by all means is Next.js but swap out React and Webpack for Svelte and [Vite](https://vitejs.dev). For me, Svelte and Vite are the two most exciting things in Javascript right now.

Svelte has been [gaining popularity](https://www.npmtrends.com/svelte) over the past year. It is mature and production-ready, but the ecosystem still has catching up to do when compared to React.

In terms of features of the framework, SvelteKit can do a lot of what Next.js can. Server-side rendering, static page generating, API functions, building for serverless, pretty much all of the core features. I didn't find myself missing Next.js features at all.

## What's wrong with Next.js?

Nothing! I really enjoy Next.js. Compared to SvelteKit today, it's much more mature and stable, and really shines when deployed to [Vercel](https://vercel.com).

However, there are two things about it that have really worn on me over the last few years: React and Webpack.

I really like React - it does so many things well. It's not that there's something "wrong" with it, but I find myself enjoying it less and less. I'll probably write another blog post on this, but for now I'll say that I find Svelte to be far less tedious to write (a common sentiment among React developers).

Webpack, on the other hand, I never liked too much. I appreciate everything it does and has done for web development, but I will not be sad to move on from it.

## Enter Vite

[Vite](https://vitejs.dev) is a "next generation" bundling tool. This is the biggest deal about SvelteKit to me. It is extremely, extremely fast. The dev server starts up in a second and hot reloads take less than 50ms. It also doesn't turn your laptop into a jet engine. How is that possible? To put it simply, it's processing far less code at a time thanks to ES Modules and pre-bundling dependencies.

I'd recommend reading ["Why Vite"](https://vitejs.dev/guide/why.html) for a more in-depth explanation on what it does differently compared to a bundler like Webpack.

Alright, on to the fun stuff.

## Starting with SvelteKit

Creating a SvelteKit project was easy:

```
npm init svelte@next my-website
```

<!-- ![creating a SvelteKit project](./init-sveltekit.mp4) -->

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

... and then I started hit some of the more unstable parts of SvelteKit. It actually didn't happen too often, but setting up this blog in particular took a lot of time. I ran into some issues with [dynamic imports](https://github.com/sveltejs/kit/issues/1326) and spent a night fiddling around with that. There weren't many resources on how to setup a blog in SvelteKit, so a lot of what I learned was pieced together from google and the [Svelte discord](https://svelte.dev/chat) (which has been immensely helpful). There's also some growing pains with the all-in approach to ES modules in both the browser and in node from SvelteKit.

## Verdict

Overall, I really enjoy using SvelteKit. Definitely don't use it in production yet
unless you're ready to deal with constant breaking changes and bugs. It's not enough to make it impossible to use, but it's enough that it would frustrate you if you were relying on it. Until then, I'd recommend using [Sapper](https://sapper.svelte.dev) as there will be a clear migration guide to SvelteKit once it's released.

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
