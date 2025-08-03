import { setUserRole } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const updateUserRole = async (hash, userId, roleId) => {
  const accessRoles = [ROLE.ADMIN]

  const access = await sessions.access(hash, accessRoles)

  if (!access) {
    return {
      error: 'Access denied',
      res: null,
    }
  }

  setUserRole(userId, roleId)

  return {
    error: null,
    res: true,
  }
}
