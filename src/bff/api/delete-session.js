export const deleteSession = async sessionId => {
  fetch(`http://localhost:3005/sessions/${sessionId}`, {
    method: 'DELETE',
  })
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }
    })
    .catch(err => {
      console.warn('[bff api] Error deleting session:', err)
      return null
    })
}
