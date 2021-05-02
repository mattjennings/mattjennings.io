const readingTime = require('reading-time')
module.exports = {
  layout: './src/routes/$md.svelte',
  extensions: ['.svx', '.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [
    require('remark-abbr'),
    () => {
      return (info, file) => {
        // parse content of md
        const content = parseMarkdownNodes(info.children)

        const readTime = readingTime(content)

        const preview = content.slice(0, 200)
        file.data.fm = {
          ...file.data.fm,
          length: readTime.text,
          preview: preview.length >= 200 ? `${preview}...` : preview
        }
      }
    }
  ],
  rehypePlugins: [
    require('rehype-slug'),
    [
      require('rehype-autolink-headings'),
      {
        behavior: 'wrap'
      }
    ]
  ]
}

/**
 * traverses through md nodes and extracts the text. it does not preserve formatting other than
 * new lines.
 */
function parseMarkdownNodes(nodes) {
  return nodes.reduce((content, node) => {
    switch (node.type) {
      case 'text':
        return content + node.value + '\n'
      default:
        if (node.children) {
          return content + parseMarkdownNodes(node.children)
        }

        return content
    }
  }, '')
}
