import { combineReducers } from 'redux'
import { authReducer } from '../auth'
import { timeSheetReducer } from '../timesheet'
import lateEarlyReducer from '../lateEarly'
import { registerOTReducer } from '../registerOT'
import { infoUserReducer } from '../inforUser'

export default combineReducers({
  auth: authReducer,
  timesheet: timeSheetReducer,
  lateEarly: lateEarlyReducer,
  registerOT: registerOTReducer,
  infoUser: infoUserReducer
})
