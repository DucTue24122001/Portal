import axios from 'axios'

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

// initialState
const initialState = {
  successRegisterLeave: false,
  errorRegisterLeave: '',
  loadingRegisterLeave: false,
  successUpdateLeave: false,
  errorUpdateLeave: '',
  loadingUpdateLeave: false,
  successConfirmLeave: false,
  errorConfirmLeave: '',
  loadingConfirmLeave: false
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
    case REGISTER_LEAVE_SUCCESS:
      return {
        loadingRegisterLeave: false,
        successRegisterLeave: true
      }
    case UPDATE_LEAVE_SUCCESS:
      return {
        loadingUpdateLeave: false,
        successUpdateLeave: true
      }
    case CONFIRM_LEAVE_SUCCESS:
      return {
        loadingConfirmLeave: false,
        successConfirmLeave: true
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

    default:
      return state
  }
}

// Actions
export const leaveActions = {
  register(dataForm) {
    return async(dispatch) => {
      try {
        dispatch({ type: REGISTER_LEAVE_REQUEST })

        const { data } = await axios.post(`REGISTER LEAVE API`, dataForm)

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

        const { data } = await axios.patch(`UPDATE LEAVE API ${idLeave}`, dataForm)

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

        const { data } = await axios.patch(`CONFIRM LEAVE API ${idLeave}`, dataForm)

        dispatch({ type: CONFIRM_LEAVE_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: CONFIRM_LEAVE_FAIL, payload: 'Confirm leave failed' })
      }
    }
  }
}
