export const removePostAsync = (requestSerevr, id) => () =>
  requestSerevr('removePost', id)
