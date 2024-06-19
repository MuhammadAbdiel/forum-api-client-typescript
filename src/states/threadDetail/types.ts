import { ThreadDetail } from '@/utils/types'

export type Action = {
  RECEIVE_THREAD_DETAIL: string
  CLEAR_THREAD_DETAIL: string
}

export type ReceiveThreadDetailAction = {
  type: string
  payload: {
    threadDetail: ThreadDetail
  }
}

export type ClearThreadDetailAction = {
  type: string
}
