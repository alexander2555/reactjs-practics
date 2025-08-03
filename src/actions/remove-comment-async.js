import { setPostData } from './set-post-data'

export const removeCommentAsync = (requestSerevr, postId, id) => dispatch => {
  requestSerevr('removePostComment', postId, id).then(postData => {
    dispatch(setPostData(postData.res))
  })
}
