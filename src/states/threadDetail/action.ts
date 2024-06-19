import api from '@/utils/api'
import Swal from 'sweetalert2'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { AppDispatch } from '../store'
import { ClearThreadDetailAction, ReceiveThreadDetailAction } from './types'
import { ThreadDetail } from '@/utils/types'

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
}

function receiveThreadDetailActionCreator(
  threadDetail: ThreadDetail,
): ReceiveThreadDetailAction {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  }
}

function clearThreadDetailActionCreator(): ClearThreadDetailAction {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  }
}

function asyncReceiveThreadDetail(threadId: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(clearThreadDetailActionCreator())
    dispatch(showLoading())

    try {
      const threadDetail = await api.getThreadById(threadId)

      const response = {
        ...threadDetail,
      }

      dispatch(receiveThreadDetailActionCreator(response))
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
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
}
