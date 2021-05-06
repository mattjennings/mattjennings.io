---
title: Remaking my website in SvelteKit
layout: blog
created: 2021-05-05
---

[SvelteKit](https://kit.svelte.dev) is an upcoming Svelte framework for creating websites. It's similar to Next.js for React, or Nuxt for Vue. It's still in beta but I wanted to give it a try with an actual project --- this website --- and see how the experience compared.

## Why SvelteKit?

Lately I've just been wanting to use Svelte instead of React. However, the lack of a Next-like framework was a deal breaker. Next has been one of my favorite frameworks over the last while and I've definitely gotten comfortable with everything it offered. [Sapper](https://sapper.dev) was the closest thing to it, but it wasn't enough for me.

SvelteKit could be considered Next but with React & Webpack swapped out for Svelte & Vite. In terms of features, it has a lot more parity to Next than Sapper did. Server-side rendering, static page generating, API functions, serverless support, etc. It's been just about everything I wanted, and even a bit more.

[Vite](https://vitejs.dev) is a "next generation" bundling tool, which SvelteKit uses as its bundler instead of Webpack. This is might be the most intriguing part of it to me. It is extremely, extremely fast. The development server starts up in a second, hot reloads are near-instant, and it doesn't turn your laptop into a jet engine. It's a novel experience. I'd recommend reading ["Why Vite"](https://vitejs.dev/guide/why.html) for a more in-depth explanation on what it does differently compared to a bundler like Webpack.

Alright, on to the fun stuff.

## Starting with SvelteKit

Creating a SvelteKit project was easy:

```
npm init svelte@next my-website
```

![creating a SvelteKit project](./init-sveltekit.mp4)

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

## Routing

Every route is represented by a page component, located in `src/routes`. A path of `/` will render `src/routes/index.svelte` and so on. One neat thing about setting up mdsvex is that this also applies to .md files, meaning `/example-markdown` will render `src/routes/example-markdown.md`.

SvelteKit also offers a really nice [layout system](https://kit.svelte.dev/docs#layouts), similar to `_app.js` with Next.

For the most part, after adding a `/blog` page and a `/blog/posts` folder containing all my .md files, I had a very basic blogging website. Now I just need a way to show all of my blog posts.

## Data loading

When you need to load data for your page you can give it a [load function](https://kit.svelte.dev/docs#loading). This function runs on both the server and the client, depending on how the user navigates, and returns the data as props. This is similar to Next's [getInitialProps](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps).

(It's worth noting that Next encourages `getServerSideProps` or `getStaticProps` instead -- which only run on the server -- and it's interesting that SvelteKit chose the isomorphic approach).

Here is how I went about showing all of the blog posts for `/blog`:

```svelte
<!-- src/routes/blog/index.svelte -->
<script context="module">
  // import all markdown files from ./posts and turn it into an array
  const posts = Object.entries(import.meta.globEager('./posts/**/*.md'))
    .map(([, post]) => post.metadata) // metadata is the .md frontmatter
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

I'm quite happy with this page in particular because it felt way too easy. `import.meta.globEager` is a [feature of Vite](https://vitejs.dev/guide/features.html#glob-import) that allowed me to import all of the .md files in the `./posts` directory. Then, in the load function, I parse the `page` query parameter and slice the posts into pages of 10 (it'll probably be a while before I have enough posts to require pagination, but nevertheless).

Most of my page components felt pretty easy to work with. Load the data, render the data. This isn't anything new, but I suppose the novelty of a new framework made it feel like it was.

## Some things weren't easy

I was surprised at how easy it was to get mdsvex working thanks to the svelte-add plugin, but after that, I wasn't sure how I could add some extra functionality that I wanted. In particular, I wanted to render a short preview of the blog posts in `/blogs`, a reading time estimate, and be able to embed videos like the `npm init svelte@next` clip earlier.

I searched around and tried to find an example of someone doing any of those things with mdsvex, but there wasn't much. Eventually I asked [Discord channel](https://svelte.dev) and got some helpful pointers, but I still had to figure out an approach myself.

The "reading time" feature is pretty common on Gatsby blogs, so I figured it must be available as a Gatsby plugin somewhere. A quick google search lead me to [gatsby-remark-reading-time](https://www.gatsbyjs.com/plugins/gatsby-remark-reading-time/) which seemed like the one. As the name suggests, it's a plugin for remark, something that mdsvex also uses.

I had to do some learning on how to write remark plugins, but they weren't so bad. Their GitHub repo had a good resource for learning how to create one, and eventually I ended up with something that worked. I ended up writing plugins for [adding preview and reading time to the metadata](https://github.com/mattjennings/mattjennings.io/tree/master/remark-plugins/blog-meta.js), [embedding videos](https://github.com/mattjennings/mattjennings.io/tree/master/remark-plugins/video.js), and [referencing relative image urls](https://github.com/mattjennings/mattjennings.io/tree/master/remark-plugins/relative-image-urls.js).

If I were using Gatsby or Next, it would be reasonable to expect that someone has already solved these problems and provided solutions in the form of plugins or npm modules. SvelteKit and even Svelte itself have such a young ecosystem that we don't have that luxury yet. At the same time, the fact that mdsvex even exists is pretty fortunate, and there are similarly great things being worked on already.

## Verdict

Overall, I really enjoy using SvelteKit. Definitely don't use it in production yet, there are still breaking changes and bugs happening regularly. Usually you're at the mercy of a GitHub comment or someone in the Discord channel explaining how to fix it. Once they hit a stable release though, I think this will be my go-to for projects whenever possible.
