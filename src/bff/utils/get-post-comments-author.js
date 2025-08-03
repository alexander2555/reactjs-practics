import { getComments, getUsers } from '../api'

export const getPostCommentsAuthor = async postId => {
  const comments = await getComments(postId)

  const users = await getUsers()

  return comments.map(comment => {
    const author = users.find(user => user.id === comment.author_id)
    return {
      ...comment,
      author: author?.login ?? 'Unknown',
    }
  })
}
