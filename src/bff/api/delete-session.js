export const deleteSession = async sessionId => {
  fetch(`http://localhost:3005/sessions${sessionId}`, {
    method: 'DELETE',
  })
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }
    })
    .catch(err => {
      console.error('Error deleting session:', err)
      return null
    })
}
