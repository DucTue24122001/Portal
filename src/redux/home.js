import { get } from '../api/BaseRequest'
const R_POINT_GETDATA = 'R_POINT_GETDATA'
const SHOW_LOADING_RPOINT = 'SHOW_LOADING_RPOINT'
const R_POINT_GETDATA_FAIL = 'R_POINT_GETDATA_FAIL'
const POINT_PERIOD = 'POINT_PERIOD'

const initState = {
  data: [],
  loading: true
}

const RPointReducer = (state = initState, action) => {
  switch (action.type) {
    case R_POINT_GETDATA:
      return {
        data: action.payload,
        loading: false
      }
    case R_POINT_GETDATA_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case SHOW_LOADING_RPOINT:
      return {
        ...state,
        loading: action.payload
      }
    case POINT_PERIOD:
      return {
        data: action.payload
      }
    default:
      return state
  }
}
export default RPointReducer

export const rpoint = {
  getRpointApi: (page) => async(dispatch) => {
    try {
      const param = { per_page: 5, page: page }
      const data = await get('points', param)

      dispatch({ type: R_POINT_GETDATA, payload: data })
    } catch (error) {
      dispatch({ type: R_POINT_GETDATA_FAIL, payload: error })
    }
  },

  updatePeriod: (page) => async(dispatch) => {
    try {
      const param = { period: page }
      const data = await get('points', param)

      dispatch({ type: R_POINT_GETDATA, payload: data })
    } catch (error) {
      dispatch({ type: R_POINT_GETDATA_FAIL, payload: error })
    }
  },

  showloading: (data) => (dispatch) => {
    dispatch({
      type: SHOW_LOADING_RPOINT,
      payload: data
    })
  }
}
