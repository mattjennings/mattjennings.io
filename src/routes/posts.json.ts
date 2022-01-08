import { getPosts } from '$lib/posts'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ url: { searchParams } }) => {
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : undefined
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')) : undefined

  return {
    body: JSON.stringify(getPosts({ limit, page }))
  }
}
