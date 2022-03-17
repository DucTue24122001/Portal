import { get, post } from '../api/BaseRequest'

// Constants
const FETCH_FORGET_CHECK = 'FETCH_FORGET_CHECK'
const FORGET_CHECK_REGISTER = 'FORGET_CHECK_REGISTER'
const FORGET_CHECK_UPDATE = 'FORGET_CHECK_UPDATE'
const FORGET_CHECK_DELETE = 'FORGET_CHECK_DELETE'
const FORGET_CHECK_FAIL = 'FORGET_CHECK_FAIL'
const REGISTER_FORGET_CHECK_REQUEST = 'REGISTER_FORGET_CHECK_REQUEST'
const REGISTER_FORGET_CHECK_SUCCESS = 'REGISTER_FORGET_CHECK_SUCCESS'
const REGISTER_FORGET_CHECK_FAIL = 'REGISTER_FORGET_CHECK_FAIL'

const initialState = {
  forgetcheck: {},
  loadingForgetCheck: false,
  success: false,
  errorForgetCheck: ''
}

// reducer
export const forgetCheckReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORGET_CHECK:
      return {
        ...state,
        forgetcheck: action.payload
      }
    case REGISTER_FORGET_CHECK_REQUEST:
      return {
        loadingForgetCheck: true,
        success: false
      }
    case REGISTER_FORGET_CHECK_SUCCESS:
      return {
        ...state,
        loadingForgetCheck: false,
        success: true
      }
    case REGISTER_FORGET_CHECK_FAIL:
      return {
        loadingForgetCheck: false,
        errorForgetCheck: action.payload
      }
    default:
      return state
  }
}

// actions
export const ForgetCheckAction = {
  fetchForgetCheck: () => async(dispatch) => {
    try {
      const response = await get('timesheets')
      console.log(response)
      dispatch({
        type: FETCH_FORGET_CHECK,
        payload: response
      })
    } catch (err) {
      dispatch({
        type: FORGET_CHECK_FAIL,
        payload: 'Err data dispatch !'
      })
    }
  },
  registerForgetCheck(dataRegisterForgetCheck) {
    return async(dispatch) => {
      try {
        dispatch({ type: REGISTER_FORGET_CHECK_REQUEST })

        const response = await post('requests', dataRegisterForgetCheck)
        dispatch({
          type: REGISTER_FORGET_CHECK_SUCCESS,
          payload: response
        })
      } catch (err) {
        dispatch({
          type: REGISTER_FORGET_CHECK_FAIL,
          payload: 'Register Forget Check Fail!'
        })
      }
    }
  }
}

