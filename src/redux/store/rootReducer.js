import { combineReducers } from 'redux'
import { authReducer } from '../auth'
import { timeSheetReducer } from '../timesheet'
import lateEarlyReducer from '../lateEarly'
import { registerOTReducer } from '../registerOT'
import { infoUserReducer } from '../inforUser'
import { leaveReducer } from '../leave'
import { leaveQuotaReducer } from '../myleave'

export default combineReducers({
  auth: authReducer,
  timesheet: timeSheetReducer,
  lateEarly: lateEarlyReducer,
  registerOT: registerOTReducer,
  infoUser: infoUserReducer,
  leave: leaveReducer,
<<<<<<< HEAD
=======
  leaveQuota: leaveQuotaReducer
>>>>>>> db6b7859aba829c0b19714c40953b33c16be6ef8
})
