import { transformPost } from '../transformers'

export const getPosts = (page = 1, limit, searchPhrase) =>
  fetch(
    `http://localhost:3005/posts?_limit=${limit}&title_like=${searchPhrase}&_page=${page}`,
  )
    .then(resp => {
      if (resp.ok) {
        return Promise.all([resp.json(), resp.headers.get('Link')])
      }
      throw new Error(resp.statusText)
    })
    .then(([posts, links]) => ({ posts: posts && posts.map(transformPost), links }))
    .catch(err => {
      console.error('Error fetching posts:', err)
      return []
    })
