import { visit } from 'unist-util-visit'

export default function videos(options = {}) {
  return function transformer(tree, file) {
    visit(tree, 'image', (node, index, parent) => {
      if (node.url.endsWith('mp4')) {
        node.type = 'html'
        node.value = `
            <video src="${node.url}"
              class="gatsby-remark-oembed-photo"
              autoplay
              loop
              title="${node.alt}"/>
          `
      }
    })
  }
}
