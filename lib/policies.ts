import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const policiesDirectory = join(process.cwd(), '_policies')

export function getPolicySlugs() {
  return fs.readdirSync(policiesDirectory)
}

export function getPolicyBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(policiesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPolicies(fields = []) {
  const slugs = getPolicySlugs()
  const policies = slugs.map((slug) => getPolicyBySlug(slug, fields))

  return policies
}
