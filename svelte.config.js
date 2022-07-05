import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex(mdsvexConfig),
    [
      preprocess({
        postcss: true
      })
    ]
  ],

  kit: {
    prerender: {
      default: true,
      entries: ['*', '/sitemap.xml']
    },
    adapter: adapter(),
    vite: {
      server: {
        fs: {
          allow: ['./']
        }
      }
    }
  }
}

export default config
