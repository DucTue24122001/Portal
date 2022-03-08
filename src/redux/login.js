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

    const { data } = await axios.post(`api`, dataForm)

    if (data) {
      setCookie(STORAGEKEY.ACCESS_TOKEN, data.access_token)
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data.user })
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: 'Dang nhap that bai' })
  }
}

// Reducer
const initialState = {
  user: {}
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
        user: action.payload
      }

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload
      }

    default:
      return state
  }
}
