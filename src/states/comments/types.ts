import { Comment, CommentDetail } from '@/utils/types'

export type Action = {
  RECEIVE_COMMENTS: string
  CLEAR_COMMENTS: string
  ADD_COMMENT: string
  DELETE_COMMENT: string
}

export type ReceiveCommentsAction = {
  type: string
  payload: {
    comments: CommentDetail[]
  }
}

export type ClearCommentsAction = {
  type: string
}

export type AddCommentAction = {
  type: string
  payload: {
    comment: Comment
  }
}

export type DeleteCommentAction = {
  type: string
  payload: {
    commentId: string
  }
}
