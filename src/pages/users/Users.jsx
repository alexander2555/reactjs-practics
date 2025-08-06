import { useEffect, useState } from 'react'
import { UserRow } from './components'
import { useServerRequest } from '../../hooks'
import { PrivateContent } from '../../components'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors'
import { checkAccess } from '../../utils'
import { ROLE } from '../../constants'
import styled from 'styled-components'

const UsersContainer = ({ className }) => {
  const userRole = useSelector(selectUserRole)
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [errMessage, setErrMessage] = useState(null)
  const [shouldUpdateUsersList, setShouldUpdateUsersList] = useState(false)

  const requestServer = useServerRequest()

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) return

    Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
      ([usersRes, rolesRes]) => {
        if (usersRes.error || rolesRes.error) {
          setErrMessage(usersRes.error || rolesRes.error)
          return
        }

        setUsers(usersRes.res)
        setRoles(rolesRes.res)
      },
    )
  }, [requestServer, shouldUpdateUsersList, userRole])

  const onUserRemove = userId => {
    if (!checkAccess([ROLE.ADMIN], userRole)) return

    requestServer('removeUser', userId).then(() => {
      setShouldUpdateUsersList(!shouldUpdateUsersList)
    })
  }

  return (
    <div className={className}>
      <PrivateContent access={[ROLE.ADMIN]} error={errMessage}>
        <h1>Users</h1>
        <table>
          <tbody>
            <tr>
              <th>User Login</th>
              <th>User Reg Date</th>
              <th>User Role</th>
              <th></th>
            </tr>
            {users?.map(({ id, login, roleId, registeredAt }) => (
              <UserRow
                key={id}
                id={id}
                login={login}
                roleId={roleId}
                registeredAt={registeredAt}
                roles={roles.filter(role => role.id !== ROLE.GUEST)}
                onUserRemove={() => onUserRemove(id)}
              />
            ))}
          </tbody>
        </table>
      </PrivateContent>
    </div>
  )
}

export const Users = styled(UsersContainer)`
  & table {
    margin: 0 auto;
  }
`
