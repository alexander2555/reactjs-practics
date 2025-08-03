import { addUser, getUser } from '../api'
import { sessions } from '../sessions'

export const register = async (regLogin, regPassword) => {
  const user = await getUser(regLogin)

  if (user) {
    return {
      error: 'User already exists',
      res: null,
    }
  }

  const newUser = await addUser(regLogin, regPassword)

  return {
    error: null,
    res: {
      id: newUser.id,
      login: newUser.login,
      roleId: newUser.role_id,
      session: sessions.create(newUser),
    },
  }
}
