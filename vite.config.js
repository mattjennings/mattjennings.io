import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import fs from 'fs'

export default defineConfig({
  plugins: [base64(), sveltekit()],
  // allows vite access to ./posts
  server: {
    fs: {
      allow: ['./']
    }
  }
})

// import as base64 string by adding ?base64 to the end of the import
function base64() {
  return {
    name: 'vite-plugin-base64-loader',
    transform(code, id) {
      const [path, query] = id.split('?')

      if (query !== 'base64') {
        return null
      }

      const base64 = fs.readFileSync(path, { encoding: 'base64' })
      return { code: `export default ${JSON.stringify(base64)}`, map: null }
    }
  }
}
