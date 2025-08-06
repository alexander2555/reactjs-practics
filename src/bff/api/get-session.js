export const getSession = async hash =>
  fetch(`http://localhost:3005/sessions?hash=${hash}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .then(sessions => sessions[0])
    .catch(err => {
      console.warn('[bff api] Error getting session:', err)
      return null
    })
