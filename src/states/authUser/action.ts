import api from '@/utils/api'
import Swal from 'sweetalert2'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { LoginPayload, User } from '../../utils/types'
import { AppDispatch } from '../store'
import { Action, AuthUser } from './types'

const ActionType: Action = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  REMOVE_AUTH_USER: 'REMOVE_AUTH_USER',
}

function setAuthUserActionCreator(authUser: User | null): AuthUser {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  }
}

function removeAuthUserActionCreator(): AuthUser {
  return {
    type: ActionType.REMOVE_AUTH_USER,
    payload: {
      authUser: null,
    },
  }
}

function asyncSetAuthUser({ username, password }: LoginPayload) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading())

    try {
      const { accessToken } = await api.login({ username, password })
      api.putAccessToken(accessToken)
      const authUser = await api.getOwnProfile()

      dispatch(setAuthUserActionCreator(authUser))
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Login Successful',
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

function asyncRemoveAuthUser() {
  return (dispatch: AppDispatch) => {
    dispatch(showLoading())

    dispatch(removeAuthUserActionCreator())
    api.putAccessToken('')

    dispatch(hideLoading())
  }
}

export {
  ActionType,
  setAuthUserActionCreator,
  removeAuthUserActionCreator,
  asyncSetAuthUser,
  asyncRemoveAuthUser,
}
