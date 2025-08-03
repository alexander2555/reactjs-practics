export const addUser = (login, password) =>
  fetch('http://localhost:3005/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      login,
      password,
      registered_at: new Date(),
      role_id: 2,
    }),
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .catch(err => {
      console.error('Error adding user:', err)
      return null
    })
