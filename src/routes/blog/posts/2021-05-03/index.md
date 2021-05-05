---
title: Migrating from Next.js to SvelteKit
layout: blog
created: 2021-05-03
---

[SvelteKit](https://kit.svelte.dev) is an upcoming Svelte framework for creating websites. It's similar to Next.js for React, or Nuxt for Vue. It's still in beta, but I wanted to give it a try with an actual project --- this website --- and see if it lived up to the hype.

My website had been needing a fresh look. It's not that it was old --- I just didn't like it. I'm not the most creative person when it comes to designing so I had been putting it off for a while. Additionally, I had been contemplating using my website as a blogging platform (it's the cool thing to do these days). I'm not sure if I'll write many posts, but not having something to write on was enough of a deterrent to never do it. We'll see how I do.

On to the fun stuff.

## What's wrong with Next.js?

Nothing at all! Next.js is still my go-to for most projects and this website redesign would have been far easier had I stayed with it. Next.js is much more mature and stable, and really shines when deployed with [Vercel](https://vercel.com) (I host just about everything on Vercel).

However, there are two things about it that have really worn on me over the last few years: React and Webpack. Let's start with React.

## What's wrong with React?

I really like React - it does so many things well. It's not that there's something "wrong" with React, but I think there are parts of it that have become problematic over time. This could be a whole blog post in itself so I'll try to keep it short.

In particular, I don't think it's very friendly for newcomers since the introduction of hooks. As an experienced React developer swimming in HOC patterns, I thought they were amazing. I mostly still do. But `useEffect` is the mother of all footguns for newcomers and its eslint rules have not helped.

Forms suck in general, but they especially suck in React. JSX 2.0 will probably never happen, though that's a minor complaint.

When I use Svelte, the weight of these problems are gone. I'm sure they will soon be replaced with Svelte-specific problems, but so far it hasn't and it's quite enjoyable.

## Webpack vs. Vite

[Vite](https://vitejs.dev) is a "next generation" bundling tool. Once upon a time, so was Webpack. I appreciate everything it's done for web development but boy, it has not been an easy tool to love.

Vite takes a different approach than Webpack by utilizing ES modules and bundling the minimum amount of code during development. They have a [great writeup](https://vitejs.dev/guide/why.html) on how they compare, so I'll let you read that if you want the details. TLDR; it's way faster and my MacBook is 50 degrees cooler. It's really hard to go back to Webpack.

## The Migration

I suppose this blog post is a bit misleading, because it was less of a migration and more of a "toss it all out and start again".
