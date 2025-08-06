import { getComments, getPosts } from '../api'
import { getCommentsCount } from '../utils'

export const fetchPosts = async (searchPhrase, limit, page) => {
  const [{ posts, links }, comments] = await Promise.all([
    getPosts(page, limit, searchPhrase),
    getComments(),
  ])

  return {
    error: null,
    res: posts.map(post => ({
      ...post,
      commentsCount: getCommentsCount(post.id, comments),
    })),
    links,
  }
}
