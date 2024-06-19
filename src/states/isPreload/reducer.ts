import { ActionType } from './action'
import { SetIsPreload } from './types'

function isPreloadReducer(
  isPreload: boolean = true,
  action: SetIsPreload,
): boolean {
  switch (action.type) {
    case ActionType.SET_IS_PRELOAD:
      return action.payload.isPreload
    default:
      return isPreload
  }
}

export default isPreloadReducer
