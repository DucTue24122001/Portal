import { combineReducers } from 'redux'
import { loginReducer } from '../login'
import { timeSheetReducer } from '../timesheet'

export default combineReducers({
  login: loginReducer,
  timesheet: timeSheetReducer
})
