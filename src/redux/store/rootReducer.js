import { combineReducers } from 'redux'
import { loginReducer } from '../login'
import NoticeReducer from '../notice'
import RPointReducer from '../home'
import ProfileReducer from '../profile'
import { timeSheetReducer } from '../timesheet'

export default combineReducers({
  login: loginReducer,
  timesheet: timeSheetReducer,
  rpoint: RPointReducer,
  notice: NoticeReducer,
  profile: ProfileReducer
})
