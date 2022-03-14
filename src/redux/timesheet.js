import { getAllApiTable, getApiTable, getSortTable } from '../api/apiTimesheet'
// InitSate
const initState = {
  data: [],
  length: 0,
  loading: true,
  btnLoading: false,
  optionSearch: 0,
  listMemberComp: [],
  modalRowTable: {}
}
// Reducer
export const timeSheetReducer = (state = initState, action) => {
  switch (action.type) {
    case 'timeSheet/search': {
      return {
        ...state,
        data: action.payload,
        optionSearch: 1
      }
    }
    case 'timeSheet/loading': {
      return {
        ...state,
        loading: action.payload
      }
    }
    case 'timeSheet/length': {
      return {
        ...state,
        length: action.payload.length,
        listMemberComp: action.payload.dataComp
      }
    }
    case 'timeSheet/getdata': {
      return {
        ...state,
        data: action.payload,
        optionSearch: 0
      }
    }
    case 'timeSheet/btnLoading': {
      return {
        ...state,
        btnLoading: action.payload
      }
    }
    case 'timeSheet/modalRowTable': {
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

export const timeSheetRedux = {
  selectTableTimeSheetApI: (params) => async(dispatch) => {
    try {
      const { page, pageSize } = params
      const data = await getApiTable('timesheets', page, pageSize)
      dispatch({
        type: 'timeSheet/getdata',
        payload: data.data
      })
      dispatch({
        type: 'timeSheet/loading',
        payload: false
      })
    } catch (error) {
      dispatch({
        type: 'timeSheet/getdata',
        payload: []
      })
    }
  },
  searchTableTimeSheetApI: (value, params, btnLoading) => async(dispatch) => {
    const { Date, Sort, radioBtn } = value
    const { page, pageSize } = params
    try {
      if (radioBtn === 1) {
        const data = await getSortTable('timesheets', Date, Sort, page, pageSize)
        if (btnLoading === true) {
          dispatch({
            type: 'timeSheet/btnLoading',
            payload: false
          })
        }
        dispatch({
          type: 'timeSheet/search',
          payload: data.data
        })
        dispatch({
          type: 'timeSheet/loading',
          payload: false
        })
      }
    } catch (err) {
      dispatch({
        type: 'timeSheet/search',
        payload: []
      })
    }
  },

  loadingTableTrue: () => {
    return {
      type: 'timeSheet/loading',
      payload: true
    }
  },
  lengthTableTimeSheetAPI: () => async(dispatch) => {
    try {
      const data = await getAllApiTable('timesheets')
      const dataComp = () =>
        data.map((item) => {
          if (item.compensation !== null) {
            return item
          }
        })
      dispatch({
        type: 'timeSheet/length',
        payload: { dataComp: dataComp, length: data.total }
      })
    } catch (error) {
      dispatch({
        type: 'timeSheet/length',
        payload: []
      })
    }
  },
  modalRowTable: (record) => (dispatch) => {
    try {
      dispatch({
        type: 'timeSheet/modalRowTable',
        payload: record
      })
    } catch (err) {
      dispatch({
        type: 'timeSheet/modalRowTable',
        payload: {}
      })
    }
  },
  btnLoadingSearch: (value) => (dispatch) => {
    try {
      dispatch({
        type: 'timeSheet/btnLoading',
        payload: value
      })
    } catch (err) {
      dispatch({
        type: 'timeSheet/btnLoading',
        payload: null
      })
    }
  }
}
