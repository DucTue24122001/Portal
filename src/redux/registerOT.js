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
export const registerOTReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_OT_REQUEST:
      return {
        loading: true
      }
    case REGISTER_OT_SUCCESS:
      return {
        ...state,
        loading: false,
        registerOT: action.payload
      }

    default:
      return state
  }
}

// Actions
export const OtAction = {
  registerOt: (dataRegisterOT) => async(dispatch) => {
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
}
