import { removeCookie, STORAGEKEY } from '@/utils/storage'

// Contants
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'

// initialState
const initialState = {
  successLogout: false,
  messageLogout: ''
}

// Reducer
export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        successLogout: true,
        messageLogout: 'Logout successfully'
      }
    default:
      return state
  }
}

// Actions
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST })
  removeCookie(STORAGEKEY.ACCESS_TOKEN)
}
