import { transformUser } from '../transformers'

export const getUser = async loginToFind =>
  fetch('http://localhost:3005/users?login=' + loginToFind)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .then(([user]) => user && transformUser(user))
    .catch(err => {
      console.error('Error fetching users:', err)
      return []
    })
