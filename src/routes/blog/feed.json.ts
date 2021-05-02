const posts = import.meta.globEager('../../../posts/*.md')
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  const { page = 0 } = params

  const parsed = Object.entries(posts).map(([key, post]) => ({
    slug: key.split('/').pop().replace(/\.md/, ''),
    ...post.metadata
  }))

  return {
    body: { posts: parsed.slice(page, page + 20) }
  }
}
