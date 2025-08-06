import { useState } from 'react'
import { useServerRequest } from '../../../../hooks'
import { Button, Icon } from '../../../../components'

import styled from 'styled-components'

const UserRowContainer = ({
  className,
  id,
  login,
  roleId: userRoleId,
  registeredAt,
  roles,
  onUserRemove,
}) => {
  const [initRoleId, setInitialRoleId] = useState(userRoleId)
  const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)

  const requestSerevr = useServerRequest()

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value))
  }

  const onRoleSave = (userId, newUserRoleId) => {
    requestSerevr('updateUserRole', userId, newUserRoleId).then(() => {
      setInitialRoleId(newUserRoleId)
    })
  }

  const isSaveBtnDisabled = selectedRoleId || initRoleId

  return (
    <tr className={className}>
      <td>
        <Button link={`/user/${id}`}>
          {login}
          &nbsp;
          <Icon id='user'></Icon>
        </Button>
      </td>
      <td>{registeredAt}</td>
      <td>
        <select name='user-role' value={selectedRoleId} onChange={onRoleChange}>
          {roles.map(({ id: roleId, name: roleName }) => (
            <option key={roleId} value={roleId}>
              {roleName}
            </option>
          ))}
        </select>
        <Button
          onClick={() => onRoleSave(id, selectedRoleId)}
          disabled={isSaveBtnDisabled}
        >
          <Icon id='save'></Icon>
        </Button>
      </td>
      <td>
        <Button onClick={onUserRemove}>
          <Icon id='trash-alt'></Icon>
        </Button>
      </td>
    </tr>
  )
}

export const UserRow = styled(UserRowContainer)``
