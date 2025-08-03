export const deleteComment = async commentId => {
  fetch(`http://localhost:3005/comments/${commentId}`, {
    method: 'DELETE',
  })
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }
    })
    .catch(err => {
      console.error('Error deleting comment:', err)
      return null
    })
}
