import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import satori from 'satori-jsx/vite'
import fs from 'fs'

export default defineConfig({
  plugins: [sveltekit(), satori(), base64Fonts(['.ttf', '.otf'])],
  // allows vite access to ./posts
  server: {
    fs: {
      allow: ['./']
    }
  }
})

function base64Fonts(ext) {
  return {
    name: 'vite-plugin-base64-fonts',
    resolveId(id) {
      return ext.some((e) => id.endsWith(e)) ? id : null
    },
    transform(code, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const base64 = fs.readFileSync(id, { encoding: 'base64' })
        return { code: `export default ${JSON.stringify(base64)}`, map: null }
      }
    }
  }
}
