import { ThreadDetail } from '@/utils/types'
import { ActionType } from './action'
import { ReceiveThreadDetailAction } from './types'

function threadDetailReducer(
  threadDetail: ThreadDetail,
  action: ReceiveThreadDetailAction,
): ThreadDetail | null {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail
    case ActionType.CLEAR_THREAD_DETAIL:
      return null
    default:
      return threadDetail
  }
}

export default threadDetailReducer
