---
title: Rewriting my website in SvelteKit
layout: blog
created: 2021-05-07
---

<script>
  import svelteKit from './init-sveltekit.mp4'
</script>

[SvelteKit](https://kit.svelte.dev) is an upcoming Svelte framework for creating websites. It's similar to Next.js for React, or Nuxt for Vue. It's still in beta but I wanted to give it a try with an actual project --- this website --- and see how the experience compared.

## Why SvelteKit?

Lately I've just been wanting to use Svelte instead of React. However, the lack of a Next-like framework was a deal breaker. Next has been one of my favorite frameworks over the last while and I've definitely gotten comfortable with everything it offered. [Sapper](https://sapper.dev) was the closest thing to it, but it wasn't enough for me.

SvelteKit could be considered Next but with React & Webpack swapped out for Svelte & Vite. It's also the successor to Sapper, so it shares a lot of similarities and will get an official migration guide. One big difference, though, is SvelteKit's ability to build for serverless. This was something Sapper couldn't really do and was a huge obstacle for me.

[Vite](https://vitejs.dev) is a "next generation" bundling tool, which SvelteKit is built on. It's an ambitious decision because it's fairly new and is a lot different than Webpack, but it is extremely, extremely fast. The development server starts up in a second, hot reloads are near-instant, and it doesn't turn your laptop into a jet engine. It's a novel experience. I'd recommend reading ["Why Vite"](https://vitejs.dev/guide/why.html) for a more in-depth explanation on how it works and what it does differently.

Alright, on to the fun stuff.

## Overall experience

I really, really enjoyed using SvelteKit. It came with its fair share of bugs and issues (which I'll get to later) but the pros far outweighed the cons for a project like this website.

#### Creating the project

Before I got started, I knew I wanted to have two things: a blog with [mdsvex](https://mdsvex.pngwn.io), and [tailwindcss](https://tailwindcss.com) for styling. I was a little concerned at how complicated it would be to set those up, but it went really smoothly.

First, I needed to make the project:

```
npm init svelte@next my-website
```

<video src={svelteKit} title="creating a SvelteKit project" autoplay loop />

This walked me through creating a blank project, giving me options for Typescript, eslint, prettier, etc.

Then, to add mdsvex and tailwind, I used [svelte-add](https://github.com/svelte-add/svelte-add). It's a collection of community-made "adders" that automatically sets up and configures the respective library in your project.

```
npx svelte-add tailwindcss
npx svelte-add mdsvex
```

This set up both tailwind and mdsvex painlessly. Here is how my project looked by this point:

```
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
│       ├── example-markdown.md
│       └── index.svelte
├── svelte.config.js
├── tailwind.config.cjs
└── tsconfig.json
```

#### Writing blog posts

SvelteKit uses a file-based routing system. All pages are located under `src/routes` as Svelte components. However, now that I've setup mdsvex, I can _also_ use .md files there as well.

Following this convention I could get started with a blog by rearranging my project like this:

```
├── src
│   └── routes
│       ├── blog
│       │   └── my-first-post.md
│       └── index.svelte
```

and now I have a blog post live at `https://mattjennings.io/blog/my-first-post`.

#### Showing all blog posts

Next I needed a page to show all blog posts. This was a good opportunity to use SvelteKit's [data loading](https://kit.svelte.dev/docs#loading) for page components. If you've used Next.js, it's very similar to `getInitialProps`. It allows you to load data however you wish and provide the data as props for the page. This runs both on the server and on the client.

This is the end result of my `/blog` page (with simplified styling):

```svelte
<!-- src/routes/blog/index.svelte -->
<script context="module">
  // import all markdown files from ./posts and turn it into an array
  const posts = Object.entries(import.meta.globEager('./posts/**/*.md'))
    .map(([, post]) => post.metadata)
    .sort((a, b) => (a.created < b.created ? 1 : -1))

  export const load = async ({ page: { query } }) => {
    const PAGE_SIZE = 10

    // get page parameter from URL
    const page = parseInt(query.get('page') ?? '1')

    return {
      props: {
        // return the page of posts
        posts: posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        page
      }
    }
  }
</script>

<script>
  export let posts
  export let page
</script>

<!-- render each post -->
<div>
  {#each posts as post}
      <a href={`/blog/post/${post.slug}`}>{post.title}</a>
  {/each}
</div>

<!-- pagination -->
<div>
  {#if page > 1}
    <a href={`/blog/post?page=${page - 1}`}>back</a>
  {/if}
  {#if posts.length === PAGE_SIZE}
    <a href={`/blog/post?page=${page + 1}`}>next</a>
  {/if}
</div>
```

`import.meta.globEager` is a feature of Vite that allowed me to import all of the .md files in the `./posts` directory. Thanks to mdsvex, importing a .md file returns both a Svelte component and a `metadata` property that represents the frontmatter data. We just need the metadata here.

Then, in the load function, I parse the `page` query parameter and return 10 posts for whichever page we're on. Pagination is as simple as navigating to `/blog?page=2` etc.

If you go to [/blog](/blog) you'll notice I have a bit more extra information on the posts, such as reading time and a short preview. I had to [write my own plugin](https://github.com/mattjennings/mattjennings.io/tree/master/remark-plugins/blog-meta.js) to do this, which wasn't too bad, but it did take me a few nights to figure out how to go about it.

#### The rest of the website

Everything else was pretty straight forward. A home page and a portfolio page. They are both written using markdown as well because it was easiest.

## Issues

There were more than a few times where I ran into issues simply because SvelteKit is still in beta. For example, this post doesn't load for me in development when rendered server-side. A fix is already on the way (it actually was a Vite bug), but things like that can _really_ grind you if you're trying to use this for project in production. I definitely don't recommend doing that yet.

Additionally, the ecosystem for Svelte and SvelteKit is still relatively young. As mentioned earlier, I had to write a custom plugin for adding extra metadata to my blog posts. If I were using Gatsby or Next.js it would be reasonable to expect someone had already done this along with an example. On the other hand, it's good that SvelteKit and mdsvex work together in a way that I _could_ figure it out on my own. It's just a maturity thing, and eventually we'll see examples that cover all kinds of use cases like this.

## Verdict

I'm going to start using it for my personal projects while it's in beta. We don't have a timeline on when a stable release is coming, so if I were starting an important project today I would go with something more stable. It's very promising though and I can't wait until it's ready for production.
