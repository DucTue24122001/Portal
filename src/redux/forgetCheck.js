import { get } from '../api/apiForgetCheck'

// Constants
export const FETCH_FORGET_CHECK = 'FETCH_FORGET_CHECK'
export const FORGET_CHECK_REGISTER = 'FORGET_CHECK_REGISTER'
export const FORGET_CHECK_UPDATE = 'FORGET_CHECK_UPDATE'
export const FORGET_CHECK_DELETE = 'FORGET_CHECK_DELETE'
export const FORGET_CHECK_FAIL = 'FORGET_CHECK_FAIL'

const initialState = {
  forgetcheck: {}
}

// reducer
const forgetCheckReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORGET_CHECK:
      return {
        ...state,
        forgetcheck: action.payload
      }
    default:
      return state
  }
}

// actions
export const fetchForgetCheck = () => async(dispatch) => {
  try {
    const response = await get('RegisterForget')
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
}

export default forgetCheckReducer
