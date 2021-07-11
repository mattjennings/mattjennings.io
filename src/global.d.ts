/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

interface Post {
  title: string
  slug: string
  date: string
  hidden?: boolean
  next?: Post
  previou?: Post
}
