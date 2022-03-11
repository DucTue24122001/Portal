import { combineReducers } from 'redux'
import { loginReducer } from '../login'
import { logoutReducer } from '../logout'
import { timeSheetReducer } from '../timesheet'
import lateEarlyReducer from '../lateEarly'

export default combineReducers({
  login: loginReducer,
  timesheet: timeSheetReducer,
  logout: logoutReducer,
  lateEarly: lateEarlyReducer,
})
