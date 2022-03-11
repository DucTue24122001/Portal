import axios from 'axios'
import { getToken } from '../utils/storage/index'

// Contants
export const GET_INFO_USER_REQUEST = 'GET_INFO_USER_REQUEST'
export const GET_INFO_USER_SUCCESS = 'GET_INFO_USER_SUCCESS'
export const GET_INFO_USER_FAIL = 'GET_INFO_USER_FAIL'

// Actions
export const getInfoUser = () => async(dispatch) => {
  try {
    dispatch({ type: GET_INFO_USER_REQUEST })

    const config = await getToken()
    const { data } = await axios.get(`http://14.232.214.101:8111/api/v1/user/info`, config)

    dispatch({ type: GET_INFO_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_INFO_USER_FAIL, payload: 'Get info user fail' })
  }
}

// Reducer
const initialState = {
  infoUser: {},
  successGetInfo: false,
  errorGetInfo: '',
  loadingGetInfo: false
}
export const infoUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO_USER_REQUEST:
      return {
        loadingGetInfo: true
      }
    case GET_INFO_USER_SUCCESS:
      return {
        ...state,
        loadingGetInfo: false,
        successGetInfo: true,
        infoUser: action.payload
      }

    case GET_INFO_USER_FAIL:
      return {
        ...state,
        successGetInfo: false,
        loadingGetInfo: false,
        errorGetInfo: action.payload
      }

    default:
      return state
  }
}
