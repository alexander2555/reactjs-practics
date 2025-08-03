export const getComments = postId => {
  const urlParams = postId ? `?post_id=${postId}` : ''

  return fetch('http://localhost:3005/comments' + urlParams)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .catch(err => {
      console.error('Error fetching comments:', err)
      return null
    })
}
