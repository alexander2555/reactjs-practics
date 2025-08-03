import { useEffect, useState } from 'react'
import { UserRow } from './components'
import { useServerRequest } from '../../hooks'
import { Content } from '../../components'
import styled from 'styled-components'
import { ROLE } from '../../constants'

const UsersContainer = ({ className }) => {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [errMessage, setErrMessage] = useState(null)
  const [shouldUpdateUsersList, setShouldUpdateUsersList] = useState(false)

  const requestServer = useServerRequest()

  useEffect(() => {
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
  }, [requestServer, shouldUpdateUsersList])

  const onUserRemove = userId => {
    requestServer('removeUser', userId).then(() => {
      setShouldUpdateUsersList(!shouldUpdateUsersList)
    })
  }

  return (
    <div className={className}>
      <Content error={errMessage}>
        <h2>Users</h2>
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
      </Content>
    </div>
  )
}

export const Users = styled(UsersContainer)``
