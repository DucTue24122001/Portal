import { get } from '../api/BaseRequest'
const NOTICE_GETDATA = 'NOTICE_GETDATA'
const NOTICE_GETDATA_FAIL = 'NOTICE_GETDATA_FAIL'
const SHOW_LOADING_NOTICE = 'SHOW_LOADING_NOTICE'

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

export const notice = {
  getNoticeData: (page) => async(dispatch) => {
    try {
      const param = { per_page: 5, page: page }
      const data = await get('notifications', param)
      dispatch({ type: NOTICE_GETDATA, payload: data })
    } catch (error) {
      dispatch({ type: NOTICE_GETDATA_FAIL, payload: error })
    }
  },

  showLoadingNotice: (data) => (dispatch) => {
    dispatch({
      type: SHOW_LOADING_NOTICE,
      payload: data
    })
  }
}
