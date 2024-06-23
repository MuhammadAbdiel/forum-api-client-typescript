import api from '@/utils/api'
import Swal from 'sweetalert2'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { AppDispatch } from '../store'
import { Reply, ReplyDetail } from '@/utils/types'
import {
  AddReplyAction,
  ClearRepliesAction,
  DeleteReplyAction,
  ReceiveRepliesAction,
} from './types'

const ActionType = {
  RECEIVE_REPLIES: 'RECEIVE_REPLIES',
  CLEAR_REPLIES: 'CLEAR_REPLIES',
  ADD_REPLY: 'ADD_REPLY',
  DELETE_REPLY: 'DELETE_REPLY',
}

function receiveRepliesActionCreator(
  replies: ReplyDetail[],
): ReceiveRepliesAction {
  return {
    type: ActionType.RECEIVE_REPLIES,
    payload: {
      replies,
    },
  }
}

function clearRepliesActionCreator(): ClearRepliesAction {
  return {
    type: ActionType.CLEAR_REPLIES,
  }
}

function addReplyActionCreator(reply: Reply): AddReplyAction {
  return {
    type: ActionType.ADD_REPLY,
    payload: {
      reply,
    },
  }
}

function deleteReplyActionCreator(replyId: string): DeleteReplyAction {
  return {
    type: ActionType.DELETE_REPLY,
    payload: {
      replyId,
    },
  }
}

function asyncReceiveReplies(threadId: string, commentId: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(clearRepliesActionCreator())
    dispatch(showLoading())

    try {
      const commentDetail = await api.getCommentById(threadId, commentId)

      dispatch(receiveRepliesActionCreator(commentDetail.replies))
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncAddReply(
  threadId: string,
  commentId: string,
  { content }: { content: string },
) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading())

    try {
      const reply = await api.createReply(threadId, commentId, { content })
      const user = await api.getOwnProfile()

      const response: any = {
        id: reply.id,
        content: reply.content,
        date: new Date().toISOString(),
        username: user.username,
        fullname: user.fullname,
      }

      dispatch(addReplyActionCreator(response))
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncDeleteReply(
  threadId: string,
  commentId: string,
  replyId: string,
) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading())

    try {
      await api.deleteReply(threadId, commentId, replyId)

      dispatch(deleteReplyActionCreator(replyId))
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    } finally {
      dispatch(hideLoading())
    }
  }
}

export {
  ActionType,
  receiveRepliesActionCreator,
  clearRepliesActionCreator,
  addReplyActionCreator,
  deleteReplyActionCreator,
  asyncReceiveReplies,
  asyncAddReply,
  asyncDeleteReply,
}
