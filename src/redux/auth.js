import axios from 'axios'
import { setCookie, removeCookie, STORAGEKEY, getToken } from '@/utils/storage'

// Contants
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'

// InitialState = {
const initialState = {
  loadingLogin: false,
  successLogin: false,
  errorLogin: '',
  loadingLogout: false,
  successLogout: false,
  messageLogout: '',
  errorLogout: ''
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
        loadingLogout: true
      }

    case LOGIN_SUCCESS:
      return {
        loadingLogin: false,
        successLogin: true
      }
    case LOGOUT_SUCCESS:
      return {
        loadingLogout: false,
        successLogout: true,
        messageLogout: action.payload.message
      }

    case LOGIN_FAIL:
      return {
        successLogin: false,
        loadingLogin: false,
        errorLogin: action.payload
      }

    case LOGOUT_FAIL:
      return {
        successLogout: false,
        loadingLogout: false,
        errorLogout: action.payload
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
          setCookie(STORAGEKEY.ACCESS_TOKEN, data.access_token)
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.message })
      } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: 'Login fail' })
      }
    }
  },

  logout() {
    return async(dispatch) => {
      try {
        dispatch({ type: LOGOUT_REQUEST })

        const config = await getToken()
        const { data } = await axios.get(`http://14.232.214.101:8111/api/v1/user/logout`, config)
        if (data) {
          removeCookie(STORAGEKEY.ACCESS_TOKEN)
        }
        dispatch({ type: LOGOUT_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: 'Logout fail' })
      }
    }
  }
}
