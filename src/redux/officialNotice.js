const NOTICE_GETDATA = 'NOTICE_GETDATA'
const NOTICE_GETDATA_FAIL = 'NOTICE_GETDATA_FAIL'
const SHOW_LOADING_NOTICE = 'SHOW_LOADING_NOTICE'
import axios from 'axios'

const initState = {
  data: [],
  loading: true
}

const NoticeReducers = (state = initState, action) => {
  switch (action.type) {
    case NOTICE_GETDATA:
      return {
        data: action.payload,
        loading: false
      }
    case NOTICE_GETDATA_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case SHOW_LOADING_NOTICE:
      return {
        ...state,
        loading: action.payload
      }

    default:
      return state
  }
}
export default NoticeReducers

export const getNoticeData = (page) => async(dispatch) => {
  try {
    const data = await axios.get(`https://6215ef287428a1d2a354d464.mockapi.io/OfficialNotice?page=${page}&limit=10`)
    dispatch({ type: NOTICE_GETDATA, payload: data.data })
  } catch (error) {
    dispatch({ type: NOTICE_GETDATA_FAIL, payload: error })
  }
}

export const showLoadingNotice = (data) => (dispatch) => {
  dispatch({
    type: SHOW_LOADING_NOTICE,
    payload: data
  })
}
