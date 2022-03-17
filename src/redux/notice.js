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
      const sizePage = { page: page, limit: pageSize }
      const data = await get('notifications', sizePage)
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
      const { Department, SortBy, Status, inputSearch } = value
      const { page, pageSize } = params
      const pageSearch = {
        page: page,
        limit: pageSize
      }
      const data = await get('notifications', pageSearch)
      const dataSort = data.data.sort(function(a, b) {
        const nameA = a.subject.toUpperCase()
        const nameB = b.subject.toUpperCase()
        if (SortBy === 'asc') {
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
        } else if (SortBy === 'desc') {
          if (nameA > nameB) {
            return -1
          }
          if (nameA < nameB) {
            return 1
          }
        }
        return 0
      })
      const dataBase = dataSort.filter((item) => {
        if (item.subject.toUpperCase().includes(inputSearch.toUpperCase()) === true) {
          if (item.subject.toUpperCase().includes(inputSearch.toUpperCase())) {
            if (item.published_to === null && Department === 'all') {
              return item
            } else if (item.published_to !== null) {
              if (item.published_to.toUpperCase().includes(Department.toUpperCase())) {
                return item
              }
            }
          }
        }
      })
      dispatch({
        type: 'notice/length',
        payload: dataBase.length
      })
      if (btnLoading === true) {
        dispatch({
          type: 'notice/btnLoading',
          payload: false
        })
      }
      dispatch({
        type: 'notice/search',
        payload: dataBase
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
