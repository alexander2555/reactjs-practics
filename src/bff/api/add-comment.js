export const addComment = (userId, postId, content) =>
  fetch('http://localhost:3005/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      author_id: userId,
      post_id: postId,
      published_at: new Date(),
      content,
    }),
  })
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }
    })
    .catch(err => {
      console.error('Error adding user:', err)
      return null
    })
