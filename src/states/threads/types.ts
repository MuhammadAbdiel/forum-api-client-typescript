import { ThreadList } from '@/utils/types'

export type Action = {
  RECEIVE_THREADS: string
  ADD_THREAD: string
}

export type ReceiveThreadAction = {
  type: string
  payload: {
    threads: ThreadList[]
  }
}

export type AddThreadAction = {
  type: string
  payload: {
    thread: ThreadList
  }
}
