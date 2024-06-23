import { ReplyDetail } from '@/utils/types'
import { ActionType } from './action'
import { AddReplyAction, ReceiveRepliesAction } from './types'

function repliesReducer(
  replies: ReplyDetail[] = [],
  action: ReceiveRepliesAction | AddReplyAction | any,
): ReplyDetail[] {
  switch (action.type) {
    case ActionType.RECEIVE_REPLIES:
      return action.payload.replies
    case ActionType.CLEAR_REPLIES:
      return []
    case ActionType.ADD_REPLY:
      return [...replies, action.payload.reply]
    case ActionType.DELETE_REPLY:
      return replies.filter((reply) => reply.id !== action.payload.replyId)
    default:
      return replies
  }
}

export default repliesReducer
