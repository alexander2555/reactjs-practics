import { useDispatch } from 'react-redux'
import { openModal, CLOSE_MODAL, removeCommentAsync } from '../../../../actions'
import { Button, Icon } from '../../../../components'
import { useServerRequest } from '../../../../hooks'
import { useSelector } from 'react-redux'
import { checkAccess } from '../../../../utils'
import { selectUserRole } from '../../../../selectors'
import styled from 'styled-components'
import { ROLE } from '../../../../constants'

const CommentContainer = ({ className, id, postId, content, author, publishedAt }) => {
  const dispatch = useDispatch()
  const requestServer = useServerRequest()
  const userRole = useSelector(selectUserRole)

  const onCommentRemove = id => {
    dispatch(
      openModal({
        modalTitle: 'Remove comment',
        onConfirm: () => {
          dispatch(removeCommentAsync(requestServer, postId, id))
          dispatch(CLOSE_MODAL)
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      }),
    )
  }

  const isAdminOrModerator = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole)

  return (
    <div className={className}>
      <p>{content}</p>
      <span>{new Date(publishedAt).toLocaleDateString()}</span>
      &nbsp;
      <span>by {author}</span>
      {isAdminOrModerator && (
        <Button onClick={() => onCommentRemove(id)}>
          <Icon id='trash' />
        </Button>
      )}
    </div>
  )
}

export const Comment = styled(CommentContainer)``
