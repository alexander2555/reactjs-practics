import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useServerRequest } from '../../../../hooks'
import { selectUserId, selectUserRole } from '../../../../selectors'
import { addCommentAsync } from '../../../../actions'
import { EditGroup } from '../../../../components'
import { Comment } from '../comment/Comment'
import { checkAccess } from '../../../../utils'
import { ROLE } from '../../../../constants'
import styled from 'styled-components'

const CommentsContainer = ({ className, comments, postId }) => {
  const dispatch = useDispatch()
  const requestServer = useServerRequest()
  const userId = useSelector(selectUserId)
  const userRole = useSelector(selectUserRole)
  const [newComment, setNewComment] = useState('')

  const onNewCommentAdd = (userId, postId, content) => {
    dispatch(addCommentAsync(requestServer, userId, postId, content))
    setNewComment('')
  }

  const isAdmin = checkAccess([ROLE.ADMIN], userRole)

  return (
    <div className={className}>
      <h2>Comments</h2>
      <EditGroup
        name={'comment'}
        data={newComment}
        setData={setNewComment}
        placeholder={'Add a comment...'}
        onClick={() => onNewCommentAdd(userId, postId, newComment)}
      />

      <div className='comments-list'>
        {comments.map(({ id, content, author, published_at }) => (
          <Comment
            key={id}
            className='comment'
            id={id}
            postId={postId}
            content={content}
            author={author}
            publishedAt={published_at}
          />
        ))}
      </div>
    </div>
  )
}

export const Comments = styled(CommentsContainer)``
