import { isAfter } from 'date-fns'

export function isPostPublic(post: Post): boolean {
  const isPublished = isAfter(new Date(), new Date(post.date))
  const isHidden = !!post.hidden

  return isPublished && !isHidden
}
