import autolinkHeadings from 'rehype-autolink-headings'
import slugPlugin from 'rehype-slug'
import metaPlugin from './remark-plugins/blog-meta.js'
import videos from './remark-plugins/videos.js'
import relativeUrls from './remark-plugins/relative-urls.js'
import { visit } from 'unist-util-visit'

export default {
  layout: {
    document: './src/lib/mdsvex-layouts/document.svelte',
    _: './src/lib/mdsvex-layouts/empty.svelte'
  },
  extensions: ['.svx', '.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [metaPlugin, videos, relativeUrls],
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
