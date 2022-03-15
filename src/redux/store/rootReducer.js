import { combineReducers } from 'redux'
import { authReducer } from '../auth'
import { timeSheetReducer } from '../timesheet'
import { lateEarlyReducer } from '../lateEarly'
import { registerOTReducer } from '../registerOT'
import { infoUserReducer } from '../inforUser'
import { leaveReducer } from '../leave'
import { noticeReducer } from '../notice'
import { leaveQuotaReducer } from '../myleave'
import { forgetCheckReducer } from '../forgetCheck'

export default combineReducers({
  auth: authReducer,
  forgetCheck: forgetCheckReducer,
  timesheet: timeSheetReducer,
  lateEarly: lateEarlyReducer,
  registerOT: registerOTReducer,
  infoUser: infoUserReducer,
  leave: leaveReducer,
  notice: noticeReducer,
  leaveQuota: leaveQuotaReducer
})
