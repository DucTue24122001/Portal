import { get } from '@/api/BaseRequest'
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
        data: action.payload
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
        data: action.payload
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
    case 'notice/optionSearch': {
      return {
        ...state,
        optionSearch: action.payload
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
      const sizePage = { page: page, per_page: pageSize, status: 0 }
      const data = await get('admin/notifications', sizePage)

      dispatch({
        type: 'notice/length',
        payload: data.total
      })
      dispatch({
        type: 'notice/getdata',
        payload: data.data
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
    try {
      const { page, pageSize } = params
      const { Department, SortBy, inputSearch, Status } = value
      const sizePage = {
        page: page,
        per_page: pageSize,
        published_to: Department,
        sort: SortBy,
        status: Status,
        subject: inputSearch
      }
      if (Department === 0) {
        sizePage.published_to = null
      }
      const data = await get('admin/notifications', sizePage)
      dispatch({
        type: 'notice/length',
        payload: data.total
      })
      if (btnLoading === true) {
        dispatch({
          type: 'notice/btnLoading',
          payload: false
        })
      }
      dispatch({
        type: 'notice/search',
        payload: data.data
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
  optionSearchorReset: (record) => (dispatch) => {
    try {
      dispatch({
        type: 'notice/optionSearch',
        payload: record
      })
    } catch (err) {
      dispatch({
        type: 'notice/optionSearch',
        payload: 0
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
