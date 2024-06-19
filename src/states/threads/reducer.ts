import { ThreadList } from '@/utils/types'
import { ActionType } from './action'
import { AddThreadAction, ReceiveThreadAction } from './types'

function threadsReducer(
  threads: ThreadList[] = [],
  action: ReceiveThreadAction | AddThreadAction | any,
): ThreadList[] {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads
    case ActionType.ADD_THREAD:
      return [...threads, action.payload.thread]
    default:
      return threads
  }
}

export default threadsReducer
