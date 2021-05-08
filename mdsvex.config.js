import autolinkHeadings from 'rehype-autolink-headings'
import slugPlugin from 'rehype-slug'
import metaPlugin from './remark-plugins/blog-meta.js'
import videos from './remark-plugins/videos.js'

export default {
  layout: {
    blog: './src/md-layouts/blog.svelte',
    page: './src/md-layouts/page.svelte',
    _: './src/md-layouts/empty.svelte'
  },
  extensions: ['.svx', '.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [metaPlugin, videos],
  rehypePlugins: [
    slugPlugin,
    [
      autolinkHeadings,
      {
        behavior: 'wrap'
      }
    ]
  ]
}
