export const transformPost = post => ({
  id: post.id,
  title: post.title,
  content: post.content,
  imageUrl: post.image_url,
  publishedAt: post.published_at,
})
