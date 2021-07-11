import { isPostPublic } from '$lib/isPostPublic'

// get all posts, return an object where key = slug, value = metadata
const posts = Object.entries(import.meta.globEager('/posts/**/*.md')).reduce((acc, [, post]) => {
  return {
    ...acc,
    [post.metadata.slug]: post.metadata
  }
}, {})

/**
 * Returns metadata for an individual post,
 * as well as the next and previous post if available
 *
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  const order = Object.entries(posts)
    .map(([, post]) => post as Post)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .filter(isPostPublic)
    .map((post) => post.slug)

  const { slug } = params

  const index = order.indexOf(slug)
  const next = posts[order[index - 1]]
  const previous = posts[order[index + 1]]

  return {
    body: {
      ...posts[slug],

      // return next/previous post if they are available
      next,
      previous
    }
  }
}
