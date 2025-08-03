export const deleteUser = id =>
  fetch('http://localhost:3005/users/' + id, {
    method: 'DELETE',
  }).catch(err => {
    console.error('Error fetching roles:', err)
  })
