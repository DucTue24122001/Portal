import {
  R_POINT_GETDATA,
  R_POINT_GETDATA_FAIL,
  SHOW_LOADING_RPOINT
} from './Constants/constants'
import axios from 'axios'

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
    default:
      return state
  }
}
export default RPointReducer

export const getRpointApi = (page) => async(dispatch) => {
  try {
    const { data } = await axios.get(
      `https://6215ef287428a1d2a354d464.mockapi.io/points?page=${page}&limit=10`
    )
    console.log('aaaaaaa', data)
    dispatch({ type: R_POINT_GETDATA, payload: data })
  } catch (error) {
    dispatch({ type: R_POINT_GETDATA_FAIL, payload: error })
  }
}

export const showloading = (data) => (dispatch) => {
  dispatch({
    type: SHOW_LOADING_RPOINT,
    payload: data
  })
}

