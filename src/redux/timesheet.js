import { getAllApiTable, getApiTable, getSortTable } from '../api/apiTimesheet'

const initState = {
  data: [],
  length: 0,
  loading: true,
  btnLoading: false,
  optionSearch: 0,
  listMemberComp: []
}

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
    default:
      return state
  }
}

export const selectTableTimeSheetApI = (params) => async(dispatch) => {
  try {
    const { page, pageSize } = params
    const data = await getApiTable('apiStaff', page, pageSize)
    dispatch({
      type: 'timeSheet/getdata',
      payload: data
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
}

export const searchTableTimeSheetApI = (value, params, btnLoading) => async(dispatch) => {
  const { Date, Sort, radioBtn } = value
  const { page, pageSize } = params
  try {
    if (radioBtn === 1) {
      const data = await getSortTable('apiStaff', Date, Sort, page, pageSize)
      if (btnLoading === true) {
        dispatch({
          type: 'timeSheet/btnLoading',
          payload: false
        })
      }
      dispatch({
        type: 'timeSheet/search',
        payload: data
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
}

export const loadingTableTrue = () => {
  return {
    type: 'timeSheet/loading',
    payload: true
  }
}

export const lengthTableTimeSheetAPI = () => async(dispatch) => {
  try {
    const data = await getAllApiTable('apiStaff')
    const dataComp = []
    data.map((item) => {
      if (item.compensation !== null) {
        dataComp.push(item)
      }
    })
    dispatch({
      type: 'timeSheet/length',
      payload: { dataComp: dataComp, length: data.length }
    })
  } catch (error) {
    dispatch({
      type: 'timeSheet/length',
      payload: []
    })
  }
}

export const btnLoadingSearch = (value) => async(dispatch) => {
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
