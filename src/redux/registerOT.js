import { get, post, put, del } from '../api/BaseRequest'

// Constants

export const GET_OT_REQUEST = 'GET_OT_REQUEST'
export const GET_OT_SUCCESS = 'GET_OT_SUCCESS'
export const GET_OT_FAIL = 'GET_OT_FAIL'

export const REGISTER_OT_REQUEST = 'REGISTER_OT_REQUEST'
export const REGISTER_OT_SUCCESS = 'REGISTER_OT_SUCCESS'
export const REGISTER_OT_FAIL = 'REGISTER_OT_FAIL'

export const UPDATE_OT_REQUEST = 'UPDATE_OT_REQUEST'
export const UPDATE_OT_SUCCESS = 'UPDATE_OT_SUCCESS'
export const UPDATE_OT_FAIL = 'UPDATE_OT_FAIL'

export const DELETE_OT_REQUEST = 'DELETE_OT_REQUEST'
export const DELETE_OT_SUCCESS = 'DELETE_OT_SUCCESS'
export const DELETE_OT_FAIL = 'DELETE_OT_FAIL'

export const CONFIRM_OT_REQUEST = 'CONFIRM_OT_REQUEST'
export const CONFIRM_OT_SUCCESS = 'CONFIRM_OT_SUCCESS'
export const CONFIRM_OT_FAIL = 'CONFIRM_OT_FAIL'

export const APPROVED_OT_REQUEST = 'APPROVED_OT_REQUEST'
export const APPROVED_OT_SUCCESS = 'APPROVED_OT_SUCCESS'
export const APPROVED_OT_FAIL = 'APPROVED_OT_FAIL'

export const REJECT_OT_REQUEST = 'REJECT_OT_REQUEST'
export const REJECT_OT_SUCCESS = 'REJECT_OT_SUCCESS'
export const REJECT_OT_FAIL = 'REJECT_OT_FAIL'

// export const GET_DATE_COVER_UP_REQUEST = 'GET_DATE_COVER_UP_REQUEST'
// export const GET_DATE_COVER_UP_SUCCESS = 'GET_DATE_COVER_UP_SUCCESS'
// export const GET_DATE_COVER_UP_FAIL = 'GET_DATE_COVER_UP_FAIL'

export const CLEAR_SUCCESS = 'CLEAR_SUCCESS'

// Reducer
const initState = {
  OT: {},

  loadingGetOTRequest: false,
  errorGetOTRequest: '',
  successGetOTRequest: false,

  loadingRegisterOT: false,
  errorRegisterOT: '',
  successRegisterOT: false,

  successUpdateOT: false,
  errorUpdateOT: '',
  loadingUpdateOT: false,

  successDeleteOT: false,
  errorDeleteOT: '',
  loadingDeleteOT: false,

  successConfirmOT: false,
  errorConfirmOT: '',
  loadingConfirmOT: false,

  successApprovedOT: false,
  errorApprovedOT: '',
  loadingApprovedOT: false,

  successRejectOT: false,
  errorRejectOT: '',
  loadingRejectOT: false
}

export const OTReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_OT_REQUEST:
      return {
        loadingGetOTRequest: true
      }
    case GET_OT_SUCCESS:
      return {
        loadingGetOTRequest: false,
        successGetOTRequest: true
      }
    case GET_OT_FAIL:
      return {
        loadingGetOTRequest: false,
        successGetOTRequest: false,
        errorGetOTRequest: action.payload
      }

    case REGISTER_OT_REQUEST:
      return {
        loadingRegisterOT: true
      }
    case REGISTER_OT_SUCCESS:
      return {
        ...state,
        loadingRegisterOT: false,
        successRegisterOT: true,
        OT: action.payload
      }
    case REGISTER_OT_FAIL:
      return {
        loadingRegisterOT: false,
        successRegisterOT: false,
        errorRegisterOT: action.payload
      }

    case UPDATE_OT_REQUEST:
      return {
        loadingUpdateOT: true
      }
    case UPDATE_OT_SUCCESS:
      return {
        ...state,
        loadingUpdateOT: false,
        successUpdateOT: true,
        OT: action.payload
      }
    case UPDATE_OT_FAIL:
      return {
        loadingUpdateOT: false,
        successUpdateOT: false,
        errorRegisterOT: action.payload
      }

    case DELETE_OT_REQUEST:
      return {
        loadingDeleteOT: true
      }
    case DELETE_OT_SUCCESS:
      return {
        ...state,
        loadingDeleteOT: false,
        successDeleteOT: true,
        OT: action.payload
      }
    case DELETE_OT_FAIL:
      return {
        loadingDeleteOT: false,
        successDeleteOT: false,
        errorDeleteOT: action.payload
      }

    case CONFIRM_OT_REQUEST:
      return {
        loadingConfirmOT: true
      }
    case CONFIRM_OT_SUCCESS:
      return {
        ...state,
        loadingConfirmOT: false,
        successConfirmOT: true,
        OT: action.payload
      }
    case CONFIRM_OT_FAIL:
      return {
        loadingConfirmOT: false,
        successConfirmOT: false,
        errorConfirmOT: action.payload
      }

    case APPROVED_OT_REQUEST:
      return {
        loadingApprovedOT: true
      }
    case APPROVED_OT_SUCCESS:
      return {
        ...state,
        loadingUApprovedOT: false,
        successApprovedOT: true,
        OT: action.payload
      }
    case APPROVED_OT_FAIL:
      return {
        loadingApprovedOT: false,
        successApprovedOT: false,
        errorApprovedOT: action.payload
      }

    case REJECT_OT_REQUEST:
      return {
        loadingRejectOT: true
      }
    case REJECT_OT_SUCCESS:
      return {
        ...state,
        loadingRejectOT: false,
        successRejectOT: true,
        OT: action.payload
      }
    case REJECT_OT_FAIL:
      return {
        loadingRejectOT: false,
        successRejectOT: false,
        errorRejectOT: action.payload
      }

    case CLEAR_SUCCESS:
      return {
        successRegisterOT: false,
        successUpdateOT: false,
        successConfirmOT: false,
        successApprovedOT: false,
        successDeleteOT: false,
        successRejectOT: false,

        errorRegisterOT: '',
        errorUpdateOT: '',
        errorConfirmOT: '',
        errorApprovedOT: '',
        errorDeleteOT: '',
        errorRejectOT: ''
      }

    default:
      return state
  }
}

// Actions
export const OTActions = {
  getRequest(idOT) {
    return async(dispatch) => {
      try {
        dispatch({ type: GET_OT_REQUEST })

        const response = await get(`request/${idOT}`)

        dispatch({ type: GET_OT_SUCCESS, payload: response })
      } catch (error) {
        dispatch({ type: GET_OT_FAIL, payload: 'Register OT failed' })
      }
    }
  },
  registerLateEarly(dataOT) {
    return async(dispatch) => {
      try {
        dispatch({ type: REGISTER_OT_REQUEST })

        const response = await post('request', dataOT)
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
  },
  updateLateEarly(dataOT, idOT) {
    return async(dispatch) => {
      try {
        dispatch({ type: UPDATE_OT_REQUEST })

        const response = await put(`request/${idOT}`, dataOT)

        dispatch({ type: UPDATE_OT_SUCCESS, payload: response })
      } catch (error) {
        dispatch({ type: UPDATE_OT_FAIL, payload: 'Update OT failed' })
      }
    }
  },
  deleteLateEarly(idOT) {
    return async(dispatch) => {
      try {
        dispatch({ type: DELETE_OT_REQUEST })

        const response = await del(`request/${idOT}`)

        dispatch({ type: DELETE_OT_SUCCESS, payload: response })
      } catch (error) {
        dispatch({ type: DELETE_OT_FAIL, payload: 'Delete OT failed' })
      }
    }
  },
  confirm(dataOT, idOT) {
    return async(dispatch) => {
      try {
        dispatch({ type: CONFIRM_OT_REQUEST })

        const response = await put(`request/${idOT}`, dataOT)

        dispatch({ type: CONFIRM_OT_SUCCESS, payload: response })
      } catch (error) {
        dispatch({ type: CONFIRM_OT_FAIL, payload: 'Confirm OT failed' })
      }
    }
  },
  approved(dataOT, idOT) {
    return async(dispatch) => {
      try {
        dispatch({ type: APPROVED_OT_REQUEST })

        const response = await put(`request/${idOT}`, dataOT)

        dispatch({ type: APPROVED_OT_SUCCESS, payload: response })
      } catch (error) {
        dispatch({ type: APPROVED_OT_FAIL, payload: 'Approved OT failed' })
      }
    }
  },
  rejectLateEarly(dataOT, idOT) {
    return async(dispatch) => {
      try {
        dispatch({ type: REJECT_OT_REQUEST })

        const response = await put(`requests/${idOT}`, dataOT)

        dispatch({ type: REJECT_OT_SUCCESS, payload: response })
      } catch (error) {
        dispatch({ type: REJECT_OT_FAIL, payload: 'Reject OT failed' })
      }
    }
  },
  clearSuccess() {
    return (dispatch) => {
      dispatch({ type: CLEAR_SUCCESS })
    }
  }
}
