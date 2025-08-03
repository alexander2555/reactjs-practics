export const getCommentsCount = (postId, comments = []) => {
  const postComments = comments.filter(comment => comment.post_id === postId)
  return postComments.length
}
