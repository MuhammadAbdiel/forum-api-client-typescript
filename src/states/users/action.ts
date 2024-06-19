import api from '@/utils/api'
import Swal from 'sweetalert2'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { RegisterPayload } from '../../utils/types'
import { AppDispatch } from '../store'

function asyncRegisterUser({ username, password, fullname }: RegisterPayload) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading())

    try {
      await api.register({ username, password, fullname })
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Register Successful',
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

export { asyncRegisterUser }
