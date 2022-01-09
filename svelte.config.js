import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

const GITPOD_URL = process.env.GITPOD_URL 

console.log(GITPOD_URL)

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
    target: '#svelte',
    prerender: {
      entries: ['*', '/sitemap.xml']
    },
    adapter: adapter({
      pages: 'public',
      assets: 'public'
    }),
    vite: {

      server: {
        hmr: GITPOD_URL ? 
        {
          clientPort: 443,
          port: 443,
          protocol: 'wss',
          host: GITPOD_URL.replace('https://', '')
        } 
        : true,
        fs: {
          allow: ['./']
        }
      }
    }
  }
}

export default config
