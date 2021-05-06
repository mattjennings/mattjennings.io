import path from 'path'
import { visit } from 'unist-util-visit'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../')

/**
 * Transforms image URLs relative to markdown tile to the correct URL
 */
export default function relativeImageUrls() {
  return function transformer(tree, file) {
    const basePath = path.parse(file.filename).dir

    // relative to /
    const filePath = basePath.split(root).pop()

    visit(tree, 'image', (node) => {
      if (node.url.startsWith('.')) {
        const url = path.join(filePath, node.url)
        node.url = url
      }
    })
  }
}
