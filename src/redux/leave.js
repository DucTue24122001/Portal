import { get, post, put, del } from '@/api/BaseRequest'

// Constants
export const REGISTER_LEAVE_REQUEST = 'REGISTER_LEAVE_REQUEST'
export const REGISTER_LEAVE_SUCCESS = 'REGISTER_LEAVE_SUCCESS'
export const REGISTER_LEAVE_FAIL = 'REGISTER_LEAVE_FAIL'

export const UPDATE_LEAVE_REQUEST = 'UPDATE_LEAVE_REQUEST'
export const UPDATE_LEAVE_SUCCESS = 'UPDATE_LEAVE_SUCCESS'
export const UPDATE_LEAVE_FAIL = 'UPDATE_LEAVE_FAIL'

export const CONFIRM_LEAVE_REQUEST = 'CONFIRM_LEAVE_REQUEST'
export const CONFIRM_LEAVE_SUCCESS = 'CONFIRM_LEAVE_SUCCESS'
export const CONFIRM_LEAVE_FAIL = 'CONFIRM_LEAVE_FAIL'

export const APPROVED_LEAVE_REQUEST = 'APPROVED_LEAVE_REQUEST'
export const APPROVED_LEAVE_SUCCESS = 'APPROVED_LEAVE_SUCCESS'
export const APPROVED_LEAVE_FAIL = 'APPROVED_LEAVE_FAIL'

export const GET_LEAVE_REQUEST_LEAVE_REQUEST = 'GET_LEAVE_REQUEST_LEAVE_REQUEST'
export const GET_LEAVE_REQUEST_LEAVE_SUCCESS = 'GET_LEAVE_REQUEST_LEAVE_SUCCESS'
export const GET_LEAVE_REQUEST_LEAVE_FAIL = 'GET_LEAVE_REQUEST_LEAVE_FAIL'

export const DELETE_LEAVE_REQUEST = 'DELETE_LEAVE_REQUEST'
export const DELETE_LEAVE_SUCCESS = 'DELETE_LEAVE_SUCCESS'
export const DELETE_LEAVE_FAIL = 'DELETE_LEAVE_FAIL'

export const REJECT_LEAVE_REQUEST = 'REJECT_LEAVE_REQUEST'
export const REJECT_LEAVE_SUCCESS = 'REJECT_LEAVE_SUCCESS'
export const REJECT_LEAVE_FAIL = 'REJECT_LEAVE_FAIL'

export const CLEAR_SUCCESS = 'CLEAR_SUCCESS'

// initialState
const initialState = {
  dataLeave: {},

  successRegisterLeave: false,
  errorRegisterLeave: '',
  loadingRegisterLeave: false,

  successUpdateLeave: false,
  errorUpdateLeave: '',
  loadingUpdateLeave: false,

  successConfirmLeave: false,
  errorConfirmLeave: '',
  loadingConfirmLeave: false,

  successApprovedLeave: false,
  errorApprovedLeave: '',
  loadingApprovedLeave: false,

  successDeleteLeave: false,
  errorDeleteLeave: '',
  loadingDeleteLeave: false,

  successGetLeaveRequest: false,
  errorGetLeaveRequest: '',
  loadingGetLeaveRequest: false,

  successDeleteLeaveRequest: false,
  errorDeleteLeaveRequest: '',
  loadingDeleteLeaveRequest: false,

  successRejectLeaveRequest: false,
  errorRejectLeaveRequest: '',
  loadingRejectLeaveRequest: false
}

// Reducer
export const leaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_LEAVE_REQUEST:
      return {
        loadingRegisterLeave: true
      }
    case UPDATE_LEAVE_REQUEST:
      return {
        loadingUpdateLeave: true
      }
    case CONFIRM_LEAVE_REQUEST:
      return {
        loadingConfirmLeave: true
      }
    case APPROVED_LEAVE_REQUEST:
      return {
        loadingApprovedLeave: true
      }
    case DELETE_LEAVE_REQUEST:
      return {
        loadingDeleteLeave: true
      }
    case GET_LEAVE_REQUEST_LEAVE_REQUEST:
      return {
        loadingGetLeaveRequest: true
      }
    case REJECT_LEAVE_REQUEST:
      return {
        loadingRejectdLeave: true
      }

    case REGISTER_LEAVE_SUCCESS:
      return {
        loadingRegisterLeave: false,
        successRegisterLeave: true,
        dataLeave: action.payload
      }
    case UPDATE_LEAVE_SUCCESS:
      return {
        loadingUpdateLeave: false,
        successUpdateLeave: true,
        dataLeave: { ...state.dataLeave, ...action.payload }
      }
    case CONFIRM_LEAVE_SUCCESS:
      return {
        loadingConfirmLeave: false,
        successConfirmLeave: true,
        dataLeave: { ...state.dataLeave, ...action.payload }
      }
    case APPROVED_LEAVE_SUCCESS:
      return {
        loadingApprovedLeave: false,
        successApprovedLeave: true,
        dataLeave: { ...state.dataLeave, ...action.payload }
      }
    case DELETE_LEAVE_SUCCESS:
      return {
        loadingDeleteLeave: false,
        successDeleteLeave: true
      }
    case GET_LEAVE_REQUEST_LEAVE_SUCCESS:
      return {
        loadingGetLeaveRequest: false,
        successGetLeaveRequest: true,
        dataLeave: { ...state.dataLeave, ...action.payload }
      }
    case REJECT_LEAVE_SUCCESS:
      return {
        loadingRejectLeaveRequest: false,
        successRejectLeaveRequest: true
      }

    case REGISTER_LEAVE_FAIL:
      return {
        loadingRegisterLeave: false,
        successRegisterLeave: false,
        errorRegisterLeave: action.payload
      }
    case UPDATE_LEAVE_FAIL:
      return {
        loadingUpdateLeave: false,
        successUpdateLeave: false,
        errorUpdateLeave: action.payload
      }
    case CONFIRM_LEAVE_FAIL:
      return {
        loadingConfirmLeave: false,
        successConfirmLeave: false,
        errorConfirmLeave: action.payload
      }
    case APPROVED_LEAVE_FAIL:
      return {
        loadingApprovedLeave: false,
        successApprovedLeave: false,
        errorApprovedLeave: action.payload
      }

    case DELETE_LEAVE_FAIL:
      return {
        loadingDeleteLeave: false,
        successDeleteLeave: false,
        errorDeleteLeave: action.payload
      }
    case GET_LEAVE_REQUEST_LEAVE_FAIL:
      return {
        successGetLeaveRequest: false,
        loadingGetLeaveRequest: false,
        errorGetLeaveRequest: action.payload
      }
    case REJECT_LEAVE_FAIL:
      return {
        successRejectLeaveRequest: false,
        loadingRejectLeaveRequest: false,
        errorRejectLeaveRequest: action.payload
      }

    case CLEAR_SUCCESS:
      return {
        successRegisterLeave: false,
        successConfirmLeave: false,
        successApprovedLeave: false,
        successGetLeaveRequest: false,
        successDeleteLeaveRequest: false,
        successRejectLeaveRequest: false,

        errorRegisterLeave: '',
        errorUpdateLeave: '',
        errorConfirmLeave: '',
        errorApprovedLeave: '',
        errorGetLeaveRequest: '',
        errorDeletetLeaveRequest: '',
        errorRejecttLeaveRequest: ''
      }

    default:
      return state
  }
}

// Actions
export const leaveActions = {
  getRequest(idLeave) {
    return async(dispatch) => {
      try {
        dispatch({ type: GET_LEAVE_REQUEST_LEAVE_REQUEST })

        const data = await get(`requests/${idLeave}`)

        dispatch({ type: GET_LEAVE_REQUEST_LEAVE_SUCCESS, payload: data.data })
      } catch (error) {
        dispatch({ type: GET_LEAVE_REQUEST_LEAVE_FAIL, payload: 'Get leave failed' })
      }
    }
  },
  register(dataForm) {
    return async(dispatch) => {
      try {
        dispatch({ type: REGISTER_LEAVE_REQUEST })

        const data = await post(`requests`, dataForm)
        dispatch({ type: REGISTER_LEAVE_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: REGISTER_LEAVE_FAIL, payload: 'Register leave failed' })
      }
    }
  },
  update(dataForm, idLeave) {
    return async(dispatch) => {
      try {
        dispatch({ type: UPDATE_LEAVE_REQUEST })

        const data = await put(`requests/${idLeave}`, dataForm)

        dispatch({ type: UPDATE_LEAVE_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: UPDATE_LEAVE_FAIL, payload: 'Update leave failed' })
      }
    }
  },
  confirm(dataForm, idLeave) {
    return async(dispatch) => {
      try {
        dispatch({ type: CONFIRM_LEAVE_REQUEST })

        const data = await put(`requests/${idLeave}`, dataForm)

        dispatch({ type: CONFIRM_LEAVE_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: CONFIRM_LEAVE_FAIL, payload: 'Confirm leave failed' })
      }
    }
  },
  approved(dataForm, idLeave) {
    return async(dispatch) => {
      try {
        dispatch({ type: APPROVED_LEAVE_REQUEST })

        const data = await put(`requests/${idLeave}`, dataForm)

        dispatch({ type: APPROVED_LEAVE_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: APPROVED_LEAVE_FAIL, payload: 'Approved leave failed' })
      }
    }
  },
  delete(idLeave) {
    console.log(idLeave)
    return async(dispatch) => {
      try {
        dispatch({ type: DELETE_LEAVE_REQUEST })

        const data = await del(`requests/${idLeave}`)

        dispatch({ type: DELETE_LEAVE_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: DELETE_LEAVE_FAIL, payload: 'Delete leave failed' })
      }
    }
  },
  reject(idLeave) {
    return async(dispatch) => {
      try {
        dispatch({ type: REJECT_LEAVE_REQUEST })

        const data = await put(`requests/${idLeave}`, dataForm)

        dispatch({ type: REJECT_LEAVE_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: REJECT_LEAVE_FAIL, payload: 'Reject leave failed' })
      }
    }
  },
  clearSuccess() {
    return (dispatch) => {
      dispatch({ type: CLEAR_SUCCESS })
    }
  }
}
