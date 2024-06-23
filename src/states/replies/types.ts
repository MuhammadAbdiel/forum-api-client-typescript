import { Reply, ReplyDetail } from '@/utils/types'

export type Action = {
  RECEIVE_REPLIES: string
  CLEAR_REPLIES: string
  ADD_REPLY: string
  DELETE_REPLY: string
}

export type ReceiveRepliesAction = {
  type: string
  payload: {
    replies: ReplyDetail[]
  }
}

export type ClearRepliesAction = {
  type: string
}

export type AddReplyAction = {
  type: string
  payload: {
    reply: Reply
  }
}

export type DeleteReplyAction = {
  type: string
  payload: {
    replyId: string
  }
}
