import { post } from '../api/apiLateEarly'

// Constants
export const REGISTER_OT_REQUEST = 'REGISTER_OT'
export const REGISTER_OT_SUCCESS = 'REGISTER_OT_SUCCESS'
export const REGISTER_OT_FAIL = 'REGISTER_OT_FAIL'

// InitState
const initState = {
  registerOT: {},
  loading: false
}

// Reducer
const registerOTReducer = (state = initState, action) => {
  console.log('action', action)
  switch (action.type) {
    case REGISTER_OT_REQUEST:
      return {
        loading: true
      }
    case REGISTER_OT_REQUEST:
      return {
        ...state,
        loading: false,
        registerOT: action.payload
      }

    default:
      return state
  }
}

export default registerOTReducer

// Actions
export const registerOT = (dataRegisterOT) => async(dispatch) => {
  try {
    dispatch({ type: REGISTER_OT_REQUEST })

    const response = await post('registerOT', dataRegisterOT)
    dispatch({
      type: REGISTER_OT_SUCCESS,
      payload: response
    })
  } catch (error) {
    dispatch({
      type: REGISTER_OT_FAIL,
      payload: 'Register OT failed!'
    })
  }
}
