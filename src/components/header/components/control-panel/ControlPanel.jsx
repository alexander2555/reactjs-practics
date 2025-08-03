import { Icon, Button } from '../../../../components'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserRole, selectUserLogin, selectUserSession } from '../../../../selectors'
import { logout } from '../../../../actions'
import { checkAccess } from '../../../../utils'
import { ROLE } from '../../../../constants'
import styled from 'styled-components'

const ControlPanelContainer = ({ className }) => {
  const dispatch = useDispatch()

  const roleId = useSelector(selectUserRole)
  const login = useSelector(selectUserLogin)
  const session = useSelector(selectUserSession)

  const onLogout = () => {
    dispatch(logout(session))
    sessionStorage.removeItem('userData')
  }

  const isAdmin = checkAccess([ROLE.ADMIN], roleId)

  return (
    <div className={className}>
      {roleId === ROLE.GUEST ? (
        <Button link='/login'>Login</Button>
      ) : (
        <div>
          <span>{login}</span>
          &nbsp;
          <Button onClick={onLogout} title='Logout'>
            <Icon id='sign-out-alt' />
          </Button>
        </div>
      )}

      <Button nav={-1}>
        <Icon id='backward' />
      </Button>
      {isAdmin && (
        <Button link='post'>
          <Icon id='file' />
        </Button>
      )}
      {isAdmin && (
        <Button link='/users'>
          <Icon id='users' />
        </Button>
      )}
    </div>
  )
}

export const ControlPanel = styled(ControlPanelContainer)``
