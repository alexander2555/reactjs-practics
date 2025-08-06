export const addPost = ({ imageUrl, title, content }) =>
  fetch(`http://localhost:3005/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      image_url: imageUrl,
      title,
      content,
      published_at: new Date().toLocaleDateString(),
    }),
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .then(data => data)
    .catch(err => {
      console.error("Error user's role update:", err)
      return []
    })
