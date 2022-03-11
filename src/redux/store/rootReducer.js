import { combineReducers } from 'redux'
import { loginReducer } from '../login'
<<<<<<< HEAD
import NoticeReducer from '../notice'
import RPointReducer from '../home'
import ProfileReducer from '../profile'
=======
import { logoutReducer } from '../logout'
>>>>>>> master
import { timeSheetReducer } from '../timesheet'
import lateEarlyReducer from '../lateEarly'

export default combineReducers({
  login: loginReducer,
  timesheet: timeSheetReducer,
<<<<<<< HEAD
  rpoint: RPointReducer,
  notice: NoticeReducer,
  profile: ProfileReducer
=======
  logout: logoutReducer,
  lateEarly: lateEarlyReducer
>>>>>>> master
})
