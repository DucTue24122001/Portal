import { get } from '@/api/BaseRequest'

// Contants
export const GET_LEAVE_QUOTA_REQUEST = 'GET_LEAVE_QUOTA_REQUEST'
export const GET_LEAVE_QUOTA_SUCCESS = 'GET_LEAVE_QUOTA_SUCCESS'
export const GET_LEAVE_QUOTA_FAIL = 'GET_LEAVE_QUOTA_FAIL'

// initialState
const initialState = {
  leaveQuota: {},
  successLeaveQuota: false,
  errorLeaveQuota: '',
  loadingLeaveQuota: false
}

// Reducer
export const leaveQuotaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEAVE_QUOTA_REQUEST:
      return {
        loadingLeaveQuota: true
      }
    case GET_LEAVE_QUOTA_SUCCESS:
      return {
        ...state,
        loadingLeaveQuota: false,
        successLeaveQuota: true,
        leaveQuota: action.payload
      }

    case GET_LEAVE_QUOTA_FAIL:
      return {
        ...state,
        successLeaveQuota: false,
        loadingLeaveQuota: false,
        errorLeaveQuota: action.payload
      }

    default:
      return state
  }
}

// Actions
export const leaveQuotaActions = {
  getLeaveQuota(year) {
    return async(dispatch) => {
      try {
        dispatch({ type: GET_LEAVE_QUOTA_REQUEST })
        const params = { year: year }
        const data = await get('leave_quotas', params)

        dispatch({ type: GET_LEAVE_QUOTA_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: GET_LEAVE_QUOTA_FAIL, payload: 'Get Leave quotas fail' })
      }
    }
  }
}
