import { getPosts } from '$lib/posts'

import { isPostPublic } from '$lib/isPostPublic'

/**
 * Generates a sitemap.xml
 *
 * credit to David Parker for the idea: https://www.youtube.com/watch?v=u8n5-urtGB0
 */
export async function get() {
  const posts = getPosts().filter(isPostPublic)

  const policies = Object.entries(import.meta.globEager('../../policies/**/*.md')).map(
    ([filepath, page]) => ({
      ...page.metadata,
      slug: filepath
        .replace(/(\/index)?\.md/, '')
        .split('/')
        .pop()
    })
  )

  return {
    body: render({ policies, posts }),
    headers: {
      'Cache-Control': `max-age=0, s-max-age=600`,
      'Content-Type': 'application/xml'
    }
  }
}

const html = String.raw // vscode syntax highlighting

const render = ({ policies, posts }) => html`<?xml version="1.0" encoding="UTF-8" ?>
  <urlset
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
  >
    <url>
      <loc>https://mattjennings.io</loc>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://mattjennings.io/blog</loc>
      <priority>0.5</priority>
    </url>
    <url>
      <loc>https://mattjennings.io/projects</loc>
      <priority>0.1</priority>
    </url>
    ${posts
      .map(
        (post) => html`<url>
          <loc>https://mattjennings.io/blog/${post.slug}</loc>
          <lastmod
            >${post.updated
              ? new Date(post.updated).toISOString()
              : new Date(post.date).toISOString()}</lastmod
          >
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>`
      )
      .join('')}
    ${policies
      .map(
        (post) => html`<url>
          <loc>https://mattjennings.io/policies/${post.slug}</loc>
          <priority>1.0</priority>
        </url>`
      )
      .join('')}
  </urlset>`
