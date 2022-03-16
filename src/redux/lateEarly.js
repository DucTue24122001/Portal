import { get, post, put, del } from '../api/BaseRequest'

// Constants
export const FETCH_LATE_EARLY = 'FETCH_LATE_EARLY'
export const LATE_EARLY_REGISTER = 'LATE_EARLY_REGISTER'
export const LATE_EARLY_UPDATE = 'LATE_EARLY_UPDATE'
export const LATE_EARLY_DELETE = 'LATE_EARLY_DELETE'
export const LATE_EARLY_FAIL = 'LATE_EARLY_FAIL'

export const REGISTER_LATE_EARLY_REQUEST = 'REGISTER_LATE_EARLY_REQUEST'
export const REGISTER_LATE_EARLY_SUCCESS = 'REGISTER_LATE_EARLY_SUCCESS'
export const REGISTER_LATE_EARLY_FAIL = 'REGISTER_LATE_EARLY_FAIL'

export const UPDATE_LATE_EARLY_REQUEST = 'UPDATE_LATE_EARLY_REQUEST'
export const UPDATE_LATE_EARLY_SUCCESS = 'UPDATE_LATE_EARLY_SUCCESS'
export const UPDATE_LATE_EARLY_FAIL = 'UPDATE_LATE_EARLY_FAIL'

export const DELETE_LATE_EARLY_REQUEST = 'DELETE_LATE_EARLY_REQUEST'
export const DELETE_LATE_EARLY_SUCCESS = 'DELETE_LATE_EARLY_SUCCESS'
export const DELETE_LATE_EARLY_FAIL = 'DELETE_LATE_EARLY_FAIL'

export const CONFIRM_LATE_EARLY_REQUEST = 'CONFIRM_LATE_EARLY_REQUEST'
export const CONFIRM_LATE_EARLY_SUCCESS = 'CONFIRM_LATE_EARLY_SUCCESS'
export const CONFIRM_LATE_EARLY_FAIL = 'CONFIRM_LATE_EARLY_FAIL'

export const APPROVED_LATE_EARLY_REQUEST = 'APPROVED_LATE_EARLY_REQUEST'
export const APPROVED_LATE_EARLY_SUCCESS = 'APPROVED_LATE_EARLY_SUCCESS'
export const APPROVED_LATE_EARLY_FAIL = 'APPROVED_LATE_EARLY_FAIL'

// Reducer
const initState = {
  lateEarly: {},

  loadingRegisterRegister: false,
  errorRegisterLateEarly: '',
  successRegisterLateEarly: false,

  successUpdateLateEarly: false,
  errorUpdateLateEarly: '',
  loadingUpdateLateEarly: false,

  successDeleteLateEarly: false,
  errorDeleteLateEarly: '',
  loadingDeleteLateEarly: false,

  successConfirmLateEarly: false,
  errorConfirmLateEarly: '',
  loadingConfirmLateEarly: false,

  successApprovedLateEarly: false,
  errorApprovedLateEarly: '',
  loadingApprovedLateEarly: false
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
        successRegisterLateEarly: true,
        lateEarly: action.payload
      }
    case REGISTER_LATE_EARLY_FAIL:
      return {
        loadingRegister: false,
        errorRegisterLateEarly: action.payload
      }

    case UPDATE_LATE_EARLY_REQUEST:
      return {
        loadingUpdateLateEarly: true
      }
    case UPDATE_LATE_EARLY_SUCCESS:
      return {
        ...state,
        loadingUpdateLateEarly: false,
        successUpdateLateEarly: true,
        lateEarly: action.payload
      }
    case UPDATE_LATE_EARLY_FAIL:
      return {
        loadingUpdateLateEarly: false,
        successUpdateLateEarly: false,
        errorRegisterLateEarly: action.payload
      }

    case DELETE_LATE_EARLY_REQUEST:
      return {
        loadingDeleteLateEarly: true
      }
    case DELETE_LATE_EARLY_SUCCESS:
      return {
        ...state,
        loadingUpdateLateEarly: false,
        successDeleteLateEarly: true,
        lateEarly: action.payload
      }
    case DELETE_LATE_EARLY_FAIL:
      return {
        loadingDeleteLateEarly: false,
        successDeleteLateEarly: false,
        errorDeleteLateEarly: action.payload
      }

    case CONFIRM_LATE_EARLY_REQUEST:
      return {
        loadingConfirmLateEarly: true
      }
    case CONFIRM_LATE_EARLY_SUCCESS:
      return {
        ...state,
        loadingUpdateLateEarly: false,
        successConfirmLateEarly: true,
        lateEarly: action.payload
      }
    case CONFIRM_LATE_EARLY_FAIL:
      return {
        loadingConfirmLateEarly: false,
        successConfirmLateEarly: false,
        errorConfirmLateEarly: action.payload
      }

    case APPROVED_LATE_EARLY_REQUEST:
      return {
        loadingApprovedLateEarly: true
      }
    case APPROVED_LATE_EARLY_SUCCESS:
      return {
        ...state,
        loadingUpdateLateEarly: false,
        successApprovedLateEarly: true,
        lateEarly: action.payload
      }
    case APPROVED_LATE_EARLY_FAIL:
      return {
        loadingApprovedLateEarly: false,
        successApprovedLateEarly: false,
        errorApprovedLateEarly: action.payload
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
  registerLateEarly(dataLateEarly) {
    return async(dispatch) => {
      try {
        dispatch({ type: REGISTER_LATE_EARLY_REQUEST })

        const response = await post('request', dataLateEarly)
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
  },
  updateLateEarly(dataLateEarly, idLateEarly) {
    return async(dispatch) => {
      try {
        dispatch({ type: UPDATE_LATE_EARLY_REQUEST })

        const response = await put(`request/${idLateEarly}`, dataLateEarly)

        dispatch({ type: UPDATE_LATE_EARLY_SUCCESS, payload: response })
      } catch (error) {
        dispatch({ type: UPDATE_LATE_EARLY_FAIL, payload: 'Update leave failed' })
      }
    }
  },
  deleteLateEarly(idLateEarly) {
    return async(dispatch) => {
      try {
        dispatch({ type: DELETE_LATE_EARLY_REQUEST })

        const response = await del(`request/${idLateEarly}`)

        dispatch({ type: DELETE_LATE_EARLY_SUCCESS, payload: response })
      } catch (error) {
        dispatch({ type: DELETE_LATE_EARLY_FAIL, payload: 'Delete leave failed' })
      }
    }
  },
  confirm(dataLateEarly, idLateEarly) {
    return async(dispatch) => {
      try {
        dispatch({ type: CONFIRM_LATE_EARLY_REQUEST })

        const response = await put(`request/${idLateEarly}`, dataLateEarly)

        dispatch({ type: CONFIRM_LATE_EARLY_SUCCESS, payload: response })
      } catch (error) {
        dispatch({ type: CONFIRM_LATE_EARLY_FAIL, payload: 'Confirm leave failed' })
      }
    }
  },
  approved(dataLateEarly, idLateEarly) {
    return async(dispatch) => {
      try {
        dispatch({ type: APPROVED_LATE_EARLY_REQUEST })

        const response = await put(`request/${idLateEarly}`, dataLateEarly)

        dispatch({ type: APPROVED_LATE_EARLY_SUCCESS, payload: response })
      } catch (error) {
        dispatch({ type: APPROVED_LATE_EARLY_FAIL, payload: 'Approved LATE_EARLY failed' })
      }
    }
  }
}
