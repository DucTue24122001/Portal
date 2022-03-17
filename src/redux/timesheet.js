import { get } from '@/api/BaseRequest'

// InitSate
const initState = {
  data: [],
  length: 0,
  loading: true,
  btnLoading: false,
  optionSearch: 0,
  modalRowTable: {},
  dataTimeLog: []
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
        length: action.payload
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
    case 'timesheet/timelog': {
      return {
        ...state,
        dataTimeLog: action.payload
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
      const sizePage = { page: page, limit: pageSize }
      const data = await get('timesheets', sizePage)
      dispatch({
        type: 'timeSheet/length',
        payload: data.total
      })
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
    const { Date, radioBtn, dateStart, dateEnd } = value
    const { page, pageSize } = params
    try {
      const sortOption = { select_type: radioBtn, order: 'asc', sort: page, per_page: pageSize }
      if (radioBtn === 1) {
        sortOption.list_selected = Date
      } else if (radioBtn === 2) {
        sortOption.start_date = dateStart.format('YYYY-MM-DD')
        sortOption.end_date = dateEnd.format('YYYY-MM-DD')
      }
      const data = await get('timesheets', sortOption)
      dispatch({
        type: 'timeSheet/length',
        payload: data.total
      })
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
    } catch (err) {
      dispatch({
        type: 'timeSheet/search',
        payload: []
      })
    }
  },
  searchTimeLogs: (id) => async(dispatch) => {
    try {
      const data = await get('checklogs')
      dispatch({
        type: 'timesheet/timelog',
        payload: data.data
      })
    } catch (err) {
      dispatch({
        type: 'timesheet/timelog',
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
