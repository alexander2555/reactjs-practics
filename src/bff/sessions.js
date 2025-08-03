import { getSession, addSession, deleteSession } from './api'

export const sessions = {
  create(user) {
    const hash =
      Math.random().toString(36).substring(2, 16) +
      Math.random().toString(36).substring(4, 18)

    addSession(hash, user)

    return hash
  },
  async remove(hash) {
    const session = getSession(hash)

    if (!session) {
      return
    }

    deleteSession(session.id)
  },
  async access(hash, accessRoles) {
    const session = await getSession(hash)

    console.log('session:', session)

    return !!session?.user && accessRoles.includes(session.user.roleId)
  },
}
