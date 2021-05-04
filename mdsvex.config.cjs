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
        const preview = getPreview(info)
        const readTime = readingTime(getContent(info))

        file.data.fm = {
          ...file.data.fm,
          length: readTime.text,
          preview
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
 * Gets the first block of text and trims it to 200 characters if necessary
 */
function getPreview(info) {
  const [text] = getContent(info).split('\n')

  return text.length > 200 ? `${text}...` : text
}

/**
 * traverses through md nodes and extracts the text. it does not preserve formatting other than
 * new lines.
 */
function getContent(info) {
  return info.children
    .flatMap((node) => {
      switch (node.type) {
        case 'text':
          return node.value.replace(/\n/g, '')
        default:
          if (node.children) {
            return getPreview(node)
          }
      }
    })
    .filter(Boolean)
    .join('\n')
}
