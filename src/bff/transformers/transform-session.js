import { register } from '../operations'

export const transformSession = session => ({
  hash: session.hash,
  id: session.id,
  user: session.user,
})
