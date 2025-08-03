import { sessions } from '../sessions'
/**
 * Logs out the user by removing their session.
 *
 * @param {Object} session - The session object to be removed.
 * @returns {Promise<void>} A promise that resolves when the session is removed.
 */
export const logout = async userSession => {
  sessions.remove(userSession)
}
