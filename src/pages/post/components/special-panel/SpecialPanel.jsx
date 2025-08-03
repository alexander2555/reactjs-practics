import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openModal, CLOSE_MODAL, removePostAsync } from '../../../../actions'
import { useServerRequest } from '../../../../hooks'
import { Button, Icon } from '../../../../components'
import { selectUserRole } from '../../../../selectors'
import { checkAccess } from '../../../../utils'
import { ROLE } from '../../../../constants'
import styled from 'styled-components'

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const requestServer = useServerRequest()
  const userRole = useSelector(selectUserRole)

  const onPostRemove = id => {
    dispatch(
      openModal({
        modalTitle: 'Remove post?',
        onConfirm: () => {
          dispatch(removePostAsync(requestServer, id)).then(() => {
            navigate('/')
          })
          dispatch(CLOSE_MODAL)
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      }),
    )
  }

  const isAdmin = checkAccess([ROLE.ADMIN], userRole)

  return (
    <div className={className}>
      <span>
        {isAdmin && editButton}
        &nbsp;
        <Icon id='calendar' />
        &nbsp;
        {publishedAt}
      </span>
      {!!publishedAt && isAdmin && (
        <Button onClick={() => onPostRemove(id)}>
          <Icon id='trash' />
        </Button>
      )}
    </div>
  )
}

export const SpecialPanel = styled(SpecialPanelContainer)``
