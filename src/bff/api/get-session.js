import { transformSession } from '../transformers'

export const getSession = async hash =>
  fetch(`http://localhost:3005/sessions?hash=${hash}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .then(session => session && transformSession(session))
    .catch(err => {
      console.error('Error getting session:', err)
      return null
    })
