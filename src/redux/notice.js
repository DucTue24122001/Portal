import { get } from '@/api/BaseRequest'
// InitSate
const initState = {
  data: [],
  length: 0,
  loading: true,
  btnLoading: false,
  optionSearch: 0,
  department: [],
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
    case 'notice/department': {
      return {
        ...state,
        department: action.payload
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
      const sizePage = { page: page, per_page: pageSize }
      const data = await get('notifications', sizePage)
      if (data !== undefined) {
        const dataDepartment = data.data.map((item) => item.published_to)
        const dataFillter = dataDepartment.filter((item) => item)
        const datalist = dataFillter.filter((item, index) => dataFillter.indexOf(item) === index)
        dispatch({
          type: 'notice/department',
          payload: datalist
        })
      }

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
      const { Department, SortBy, inputSearch } = value
      const sizePage = { page: page, per_page: pageSize }
      const data = await get('notifications', sizePage)
      console.log(data.data)
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
          if (item.published_to === null && Department === 'all') {
            return item
          } else if (item.published_to !== null && Department !== 'all') {
            if (item.published_to.toUpperCase().includes(Department.toUpperCase())) {
              return item
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
