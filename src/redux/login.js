import axios from 'axios'
import { setCookie, STORAGEKEY } from '@/utils/storage'

// Contants
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

// Actions
export const login = (dataForm) => async(dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST })

    const { data } = await axios.post(`https://o9dqpi-3000.sse.codesandbox.io/users`, dataForm)
    if (data) {
      setCookie(STORAGEKEY.ACCESS_TOKEN, data.accessToken)
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.user })
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: 'Dang nhap that bai' })
  }
}

// Reducer
const initialState = {
  user: {},
  loading: false,
  success: false
}
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
        user: action.payload
      }

    case LOGIN_FAIL:
      return {
        ...state,
        success: false,
        loading: false,
        user: null,
        error: action.payload
      }

    default:
      return state
  }
}
