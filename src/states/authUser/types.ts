import { User } from '../../utils/types'

export type Action = {
  SET_AUTH_USER: string
  REMOVE_AUTH_USER: string
}

export type AuthUser = {
  type: string
  payload: { authUser: User | null }
}
