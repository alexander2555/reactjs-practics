import { getPost } from '../api'
import { getPostCommentsAuthor } from '../utils'

export const fetchPost = async postId => {
  const post = await getPost(postId)

  if (post.error) {
    return {
      error: post.error,
      res: null,
    }
  }

  const comments = await getPostCommentsAuthor(postId)

  return {
    error: null,
    res: { ...post, comments },
  }
}
