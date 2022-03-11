import axios from 'axios'
import { setCookie, STORAGEKEY } from '@/utils/storage'

// Contants
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

// InitialState = {
const initialState = {
  message: '',
  error: '',
  loading: false,
  success: false
}

// Reducer
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload
      }

    case LOGIN_FAIL:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}

// Actions

export const login = (dataForm) => async(dispatch) => {
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
