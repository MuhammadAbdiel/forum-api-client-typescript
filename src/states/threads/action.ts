import api from '@/utils/api'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import Swal from 'sweetalert2'
import { Action, AddThreadAction, ReceiveThreadAction } from './types'
import { CreateThreadPayload, ThreadList } from '@/utils/types'
import { AppDispatch } from '../store'

const ActionType: Action = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
}

function receiveThreadsActionCreator(
  threads: ThreadList[],
): ReceiveThreadAction {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  }
}

function addThreadActionCreator(thread: ThreadList): AddThreadAction {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  }
}

function asyncReceiveThreads() {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading())

    try {
      const threads = await api.getAllThread()

      dispatch(receiveThreadsActionCreator(threads))
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

function asyncAddThread({ title, body }: CreateThreadPayload) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading())

    try {
      const thread = await api.createThread({ title, body })
      const user = await api.getOwnProfile()

      const response = {
        id: thread.id,
        title: thread.title,
        body,
        date: new Date().toISOString(),
        user: {
          username: user.username,
          fullname: user.fullname,
        },
      }

      dispatch(addThreadActionCreator(response))
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Create Thread Successful',
      })
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
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncReceiveThreads,
  asyncAddThread,
}
