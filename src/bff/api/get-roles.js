export const getRoles = () =>
  fetch('http://localhost:3005/roles')
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    // .then(users => users)
    .catch(err => {
      console.error('Error fetching roles:', err)
      return []
    })
