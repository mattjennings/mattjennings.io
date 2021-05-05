const readingTime = require('reading-time')
module.exports = {
  layout: {
    blog: './src/md-layouts/blog.svelte',
    page: './src/md-layouts/page.svelte',
    _: './src/md-layouts/empty.svelte'
  },
  extensions: ['.svx', '.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [
    () => {
      return (info, file) => {
        const content = getContent(info)
        const [preview] = content.split('\n')
        const readTime = readingTime(content)

        file.data.fm = {
          ...file.data.fm,
          length: readTime.text,
          preview: truncate(preview, 300)
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

function truncate(str, length) {
  if (str.length < length) {
    return str
  }

  let truncated = str.slice(0, length).trim()

  // prevent .... truncation
  if (truncated.endsWith('.')) {
    truncated = truncated.slice(0, length - 1)
  }

  return `${truncated}...`
}
/**
 * traverses through md nodes and extracts the text. it does not preserve formatting other than
 * new lines.
 */
function getContent(info) {
  return info.children.reduce((content, node) => {
    switch (node.type) {
      case 'text':
        return content + node.value.replace(/\n/g, '')
      case 'link':
        return content + getContent(node)
      default:
        if (node.children) {
          return content + getContent(node) + '\n'
        }
    }
    return content
  }, '')
}
