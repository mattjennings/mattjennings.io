import readingTime from 'reading-time'
import path from 'path'

/**
 * Adds some extra meta information for blog posts
 */
export default function blogMeta() {
  return (info, file) => {
    const content = getContent(info)
    const [preview] = content.split('\n')
    const readTime = readingTime(content)

    file.data.fm = {
      ...file.data.fm,
      slug: path.parse(file.filename).dir.split('/').pop(),
      length: readTime.text,
      preview: truncate(preview, 300)
    }
  }
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
