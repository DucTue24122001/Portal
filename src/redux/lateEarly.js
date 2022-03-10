import { get } from '../api/apiLateEarly'

// Constants
export const FETCH_LATE_EARLY = 'FETCH_LATE_EARLY'
export const LATE_EARLY_REGISTER = 'LATE_EARLY_REGISTER'
export const LATE_EARLY_UPDATE = 'LATE_EARLY_UPDATE'
export const LATE_EARLY_DELETE = 'LATE_EARLY_DELETE'
export const LATE_EARLY_FAIL = 'LATE_EARLY_FAIL'

// Actions
export const fetchLateEarly = () => async(dispatch) => {
  try {
    const response = await get('editLateEarly/1')

    dispatch({
      type: FETCH_LATE_EARLY,
      payload: response
    })
  } catch (error) {
    dispatch({
      type: LATE_EARLY_FAIL,
      payload: 'Fetch data register late early failed!'
    })
  }
}

// Reducer
const initState = {
  lateEarly: {}
}

const lateEarlyReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_LATE_EARLY:
      return {
        ...state,
        lateEarly: action.payload
      }

    default:
      return state
  }
}

export default lateEarlyReducer
