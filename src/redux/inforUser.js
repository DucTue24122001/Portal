import { get } from '@/api/BaseRequest'

// Contants
export const GET_INFO_USER_REQUEST = 'GET_INFO_USER_REQUEST'
export const GET_INFO_USER_SUCCESS = 'GET_INFO_USER_SUCCESS'
export const GET_INFO_USER_FAIL = 'GET_INFO_USER_FAIL'

// initialState
const initialState = {
  infoUser: {},
  successGetInfo: false,
  errorGetInfo: '',
  loadingGetInfo: false
}

// Reducer
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

// Actions

export const infoUserActions = {
  getInfoUser() {
    return async(dispatch) => {
      try {
        dispatch({ type: GET_INFO_USER_REQUEST })

        const data = await get(`user/info`)

        dispatch({ type: GET_INFO_USER_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: GET_INFO_USER_FAIL, payload: 'Get info user fail' })
      }
    }
  }
}
