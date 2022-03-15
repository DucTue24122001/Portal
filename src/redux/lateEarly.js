import { get, post } from '../api/apiLateEarly'

// Constants
export const FETCH_LATE_EARLY = 'FETCH_LATE_EARLY'
export const LATE_EARLY_REGISTER = 'LATE_EARLY_REGISTER'
export const LATE_EARLY_UPDATE = 'LATE_EARLY_UPDATE'
export const LATE_EARLY_DELETE = 'LATE_EARLY_DELETE'
export const LATE_EARLY_FAIL = 'LATE_EARLY_FAIL'

export const REGISTER_LATE_EARLY_REQUEST = 'REGISTER_LATE_EARLY_REQUEST'
export const REGISTER_LATE_EARLY_SUCCESS = 'REGISTER_LATE_EARLY_SUCCESS'
export const REGISTER_LATE_EARLY_FAIL = 'REGISTER_LATE_EARLY_FAIL'

// Reducer
const initState = {
  lateEarly: {},
  loadingRegisterRegister: false,
  errorRegisterLateEarly: ''
}

export const lateEarlyReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_LATE_EARLY:
      return {
        ...state,
        lateEarly: action.payload
      }
    case REGISTER_LATE_EARLY_REQUEST:
      return {
        loadingRegister: true
      }
    case REGISTER_LATE_EARLY_SUCCESS:
      return {
        ...state,
        loadingRegister: false,
        lateEarly: action.payload
      }
    case REGISTER_LATE_EARLY_FAIL:
      return {
        loadingRegister: false,
        errorRegisterLateEarly: action.payload
      }

    default:
      return state
  }
}

// Actions
export const LateEarlyActions = {
  fetchLateEarly: () => async(dispatch) => {
    try {
      const response = await get('editLateEarly/1')

      dispatch({
        type: FETCH_LATE_EARLY,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: REGISTER_OT_FAIL,
        payload: 'Fetch Register Late Early failed!'
      })
    }
  },
  registerLateEarly(dataRegisterLateEarly) {
    return async(dispatch) => {
      try {
        dispatch({ type: REGISTER_LATE_EARLY_REQUEST })

        const response = await post('editLateEarly', dataRegisterLateEarly)
        dispatch({
          type: REGISTER_LATE_EARLY_SUCCESS,
          payload: response
        })
      } catch (error) {
        dispatch({
          type: REGISTER_LATE_EARLY_FAIL,
          payload: 'Register Late Early failed!'
        })
      }
    }
  }
}
