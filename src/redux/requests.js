import { get } from '@/api/BaseRequest'

// Contants
export const GET_REQUESTS_REQUEST = 'GET_REQUESTS_REQUEST'
export const GET_REQUESTS_SUCCESS = 'GET_REQUESTS_SUCCESS'
export const GET_REQUESTS_FAIL = 'GET_REQUESTS_FAIL'

// initialState
const initialState = {
  requests: {},
  successRequests: false,
  errorRequests: '',
  loadingRequests: false
}

// Reducer
export const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUESTS_REQUEST:
      return {
        loadingRequests: true
      }
    case GET_REQUESTS_SUCCESS:
      return {
        ...state,
        loadingRequests: false,
        successRequests: true,
        requests: action.payload
      }

    case GET_REQUESTS_FAIL:
      return {
        ...state,
        successRequests: false,
        loadingRequests: false,
        errorRequests: action.payload
      }

    default:
      return state
  }
}

// Actions
export const requestsActions = {
  getRequests(params) {
    return async(dispatch) => {
      try {
        dispatch({ type: GET_REQUESTS_REQUEST })
        const data = await get('requests', params)

        dispatch({ type: GET_REQUESTS_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: GET_REQUESTS_FAIL, payload: 'Get Requests fail' })
      }
    }
  }
}
