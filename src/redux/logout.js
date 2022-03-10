import { removeCookie, STORAGEKEY } from '@/utils/storage'

// Contants
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'

// Actions
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST })
  removeCookie(STORAGEKEY.ACCESS_TOKEN)
}

// Reducer
const initialState = {
  successLogout: false,
  messageLogout: ''
}

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
