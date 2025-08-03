import { deleteUser } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const removeUser = async (hash, id) => {
  const accessRoles = [ROLE.ADMIN]

  const access = await sessions.access(hash, accessRoles)

  if (!access) {
    return {
      error: 'Access denied',
      res: null,
    }
  }

  await deleteUser(id)

  return {
    error: null,
    res: null,
  }
}
