import { transformPost } from '../transformers'

export const getPost = async postId =>
  fetch('http://localhost:3005/posts/' + postId)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }

      if (resp.status === 404) {
        throw new Error(`Post with ID ${postId} not found.`)
      }

      throw new Error(resp.statusText)
    })
    .then(post => post && transformPost(post))
    .catch(err => {
      console.error('Error fetching post:', err)
      return { error: err }
    })
