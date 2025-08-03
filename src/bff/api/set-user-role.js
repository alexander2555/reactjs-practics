export const setUserRole = (userId, roleId) =>
  fetch(`http://localhost:3005/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ role_id: roleId }),
  })
    .then(resp => {
      if (!resp.ok) throw new Error(resp.statusText)
    })
    .catch(err => {
      console.error("Error user's role update:", err)
      return []
    })
