import { website, name } from '$lib/info'
/**
 * Dynamically loads the svelte component for the post (only possible in +page.js)
 * and pass on the data from +page.server.js
 *
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ data }) {
  // load the markdown file based on slug
  const component = data.post.isIndexFile
    ? // vite requires relative paths and explicit file extensions for dynamic imports
      // see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
      await import(`../../../../posts/${data.post.slug}/index.md`)
    : await import(`../../../../posts/${data.post.slug}.md`)

  return {
    post: data.post,
    component: component.default,
    seo: {
      title: `${data.post.title} - ${name}`,
      description: data.post.preview.text,
      imgText: data.post.title,
      url: `${website}/blog/${data.post.slug}`
    },
    layout: {
      fullWidth: true
    }
  }
}
