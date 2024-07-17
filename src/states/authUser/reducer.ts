import { User } from '../../utils/types'
import { ActionType } from './action'
import { AuthUser } from './types'

function authUserReducer(
  authUser: User | null = null,
  action: AuthUser | any,
): User | null {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload.authUser
    case ActionType.REMOVE_AUTH_USER:
      return action.payload.authUser
    default:
      return authUser
  }
}

export default authUserReducer
