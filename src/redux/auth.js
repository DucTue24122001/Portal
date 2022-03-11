import axios from 'axios'
import { setCookie, removeCookie, STORAGEKEY } from '@/utils/storage'

// Contants
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'

// InitialState = {
const initialState = {
  errorLogin: '',
  loadingLogin: false,
  successLogin: false,
  successLogout: false,
  messageLogout: ''
}

// Reducer
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loadingLogin: true
      }

    case LOGOUT_REQUEST:
      return {
        successLogout: true,
        messageLogout: 'Logout successfully'
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        loadingLogin: false,
        successLogin: true
      }

    case LOGIN_FAIL:
      return {
        ...state,
        successLogin: false,
        loadingLogin: false,
        errorLogin: action.payload
      }

    default:
      return state
  }
}

// Actions

export const authActions = {
  login(dataForm) {
    return async(dispatch) => {
      try {
        dispatch({ type: LOGIN_REQUEST })

        const { data } = await axios.post(`http://14.232.214.101:8111/api/v1/user/login`, dataForm)
        if (data) {
          setCookie(STORAGEKEY.ACCESS_TOKEN, data.token)
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.message })
      } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: 'Login fail' })
      }
    }
  },

  logout() {
    return (dispatch) => {
      dispatch({ type: LOGOUT_REQUEST })
      removeCookie(STORAGEKEY.ACCESS_TOKEN)
    }
  }
}
