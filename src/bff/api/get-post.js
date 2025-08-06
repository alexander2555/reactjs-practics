import { transformPost } from '../transformers'

export const getPost = async postId =>
  fetch(`http://localhost:3005/posts/${postId}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }

      const errorText =
        resp.status === 404 ? `Post with ID ${postId} not found.` : resp.statusText

      throw new Error(errorText)
    })
    .then(post => post && transformPost(post))
    .catch(err => {
      console.warn('[bff api] Error fetching post:', err)
      return { error: err }
    })
