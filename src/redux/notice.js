import { getAll, get, getSort } from '../api/apiNotice'
// InitSate
const initState = {
  data: [],
  length: 0,
  loading: true,
  btnLoading: false,
  optionSearch: 0,
  modalRowTable: {}
}
// Reducer
export const noticeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'notice/search': {
      return {
        ...state,
        data: action.payload,
        optionSearch: 1
      }
    }
    case 'notice/loading': {
      return {
        ...state,
        loading: action.payload
      }
    }
    case 'notice/length': {
      return {
        ...state,
        length: action.payload
      }
    }
    case 'notice/getdata': {
      return {
        ...state,
        data: action.payload,
        optionSearch: 0
      }
    }
    case 'notice/btnLoading': {
      return {
        ...state,
        btnLoading: action.payload
      }
    }
    case 'notice/modalRowTable': {
      return {
        ...state,
        modalRowTable: action.payload
      }
    }
    default:
      return state
  }
}
// Actions

export const noticeRedux = {
  selectTableNotice: (params) => async(dispatch) => {
    try {
      const { page, pageSize } = params
      const data = await get('notifications', page, pageSize)
      dispatch({
        type: 'notice/getdata',
        payload: data
      })
      dispatch({
        type: 'notice/loading',
        payload: false
      })
    } catch (error) {
      dispatch({
        type: 'notice/getdata',
        payload: []
      })
    }
  },
  searchTableNotice: (value, params, btnLoading) => async(dispatch) => {
    const { Department, SortBy, Status, inputSearch } = value
    const { page, pageSize } = params
    try {
      const data = await getSort('notifications', Department, SortBy, Status, inputSearch, page, pageSize)
      if (btnLoading === true) {
        dispatch({
          type: 'notice/btnLoading',
          payload: false
        })
      }
      dispatch({
        type: 'notice/search',
        payload: data
      })
      dispatch({
        type: 'notice/loading',
        payload: false
      })
    } catch (err) {
      dispatch({
        type: 'notice/search',
        payload: []
      })
    }
  },

  loadingTableTrue: () => {
    return {
      type: 'notice/loading',
      payload: true
    }
  },
  lengthTableNotice: () => async(dispatch) => {
    try {
      const data = await getAll('notifications')
      dispatch({
        type: 'notice/length',
        payload: data.length
      })
    } catch (error) {
      dispatch({
        type: 'notice/length',
        payload: []
      })
    }
  },
  modalRowTable: (record) => (dispatch) => {
    try {
      dispatch({
        type: 'notice/modalRowTable',
        payload: record
      })
    } catch (err) {
      dispatch({
        type: 'notice/modalRowTable',
        payload: {}
      })
    }
  },
  btnLoadingSearch: (value) => (dispatch) => {
    try {
      dispatch({
        type: 'notice/btnLoading',
        payload: value
      })
    } catch (err) {
      dispatch({
        type: 'notice/btnLoading',
        payload: null
      })
    }
  }
}
