import api from '@/utils/api'
import Swal from 'sweetalert2'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { AppDispatch } from '../store'
import { Comment, CommentDetail } from '@/utils/types'
import {
  AddCommentAction,
  ClearCommentsAction,
  DeleteCommentAction,
  ReceiveCommentsAction,
} from './types'

const ActionType = {
  RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
  CLEAR_COMMENTS: 'CLEAR_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
}

function receiveCommentsActionCreator(
  comments: CommentDetail[],
): ReceiveCommentsAction {
  return {
    type: ActionType.RECEIVE_COMMENTS,
    payload: {
      comments,
    },
  }
}

function clearCommentsActionCreator(): ClearCommentsAction {
  return {
    type: ActionType.CLEAR_COMMENTS,
  }
}

function addCommentActionCreator(comment: Comment): AddCommentAction {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  }
}

function deleteCommentActionCreator(commentId: string): DeleteCommentAction {
  return {
    type: ActionType.DELETE_COMMENT,
    payload: {
      commentId,
    },
  }
}

function asyncReceiveComments(threadId: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(clearCommentsActionCreator())
    dispatch(showLoading())

    try {
      const threadDetail = await api.getThreadById(threadId)

      dispatch(receiveCommentsActionCreator(threadDetail.comments))
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

function asyncAddComment(threadId: string, { content }: { content: string }) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading())

    try {
      const comment = await api.createComment(threadId, { content })
      const user = await api.getOwnProfile()

      const response: any = {
        id: comment.id,
        content: comment.content,
        date: new Date().toISOString(),
        username: user.username,
        fullname: user.fullname,
        replies: [],
      }

      dispatch(addCommentActionCreator(response))
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

function asyncDeleteComment(threadId: string, commentId: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading())

    try {
      await api.deleteComment(threadId, commentId)

      dispatch(deleteCommentActionCreator(commentId))
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
  asyncReceiveComments,
  clearCommentsActionCreator,
  addCommentActionCreator,
  deleteCommentActionCreator,
  receiveCommentsActionCreator,
  asyncAddComment,
  asyncDeleteComment,
}
