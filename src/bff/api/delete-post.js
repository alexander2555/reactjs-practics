export const deletePost = id =>
  fetch('http://localhost:3005/posts/' + id, {
    method: 'DELETE',
  }).catch(err => {
    console.error('Error fetching roles:', err)
  })
