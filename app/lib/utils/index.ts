import { CommentFormValues } from '$lib/types'

export async function createPost(data: CommentFormValues) {
  const res = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data }),
  }).then(r => r.json)

  return res
}
