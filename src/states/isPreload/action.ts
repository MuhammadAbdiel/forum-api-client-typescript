import api from '@/utils/api'
import { setAuthUserActionCreator } from '../authUser/action'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { Action, SetIsPreload } from './types'
import { AppDispatch } from '../store'

const ActionType: Action = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
}

function setIsPreloadActionCreator(isPreload: boolean): SetIsPreload {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  }
}

function asyncPreloadProcess() {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading())

    try {
      const authUser = await api.getOwnProfile()
      dispatch(setAuthUserActionCreator(authUser))
    } catch (error) {
      dispatch(setAuthUserActionCreator(null))
    } finally {
      dispatch(setIsPreloadActionCreator(false))

      dispatch(hideLoading())
    }
  }
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess }
