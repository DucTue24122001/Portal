import { combineReducers } from 'redux'
import RPointReducer from '../home'
import NoticeReducers from '../officialNotice'
import ProfileReducer from '../profile'
import { authReducer } from '../auth'
import { timeSheetReducer } from '../timesheet'
import { lateEarlyReducer } from '../lateEarly'
import { registerOTReducer } from '../registerOT'
import { infoUserReducer } from '../inforUser'
import { leaveReducer } from '../leave'
import { noticeReducer } from '../notice'
import { leaveQuotaReducer } from '../myleave'

export default combineReducers({
  auth: authReducer,
  timesheet: timeSheetReducer,
  rpoint: RPointReducer,
  notices: NoticeReducers,
  profile: ProfileReducer,
  lateEarly: lateEarlyReducer,
  registerOT: registerOTReducer,
  infoUser: infoUserReducer,
  leave: leaveReducer,
  notice: noticeReducer,
  leaveQuota: leaveQuotaReducer
})
