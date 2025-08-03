import { setPostData } from './set-post-data'

export const addCommentAsync = (requestSerevr, userId, postId, content) => dispatch => {
  requestSerevr('addPostComment', userId, postId, content).then(postData => {
    dispatch(setPostData(postData.res))
  })
}
