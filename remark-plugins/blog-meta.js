import readingTime from 'reading-time'
import path from 'path'

/**
 * Adds some extra meta information for blog posts
 */
export default function blogMeta() {
  return (info, file) => {
    const content = getContent(info)
    const readTime = readingTime(content)
    const [previewHtml] = getContent(info, true).split('\n')
    const [preview] = content.split('\n')

    const parsed = path.parse(file.filename)

    file.data.fm = {
      ...file.data.fm,
      slug: parsed.name === 'index' ? path.parse(file.filename).dir.split('/').pop() : parsed.name,
      length: readTime.text,
      preview: truncate(preview, 300),
      previewHtml: truncate(previewHtml, 300),
      created: file.data.fm ? offsetTimezone(new Date(file.data.fm.created)) : undefined
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
function getContent(info, html = false) {
  return info.children.reduce((content, node) => {
    switch (node.type) {
      case 'text':
        return content + node.value.replace(/\n/g, '')
      case 'link':
        if (html) {
          return content + `<a href="${node.url}">${getContent(node, html)}</a>`
        } else {
          return content + getContent(node, html)
        }
      default:
        if (node.children) {
          return content + getContent(node, html) + '\n'
        }
    }
    return content
  }, '')
}

function offsetTimezone(date) {
  return new Date(new Date(date).valueOf() + new Date(date).getTimezoneOffset() * 60 * 1000)
}
