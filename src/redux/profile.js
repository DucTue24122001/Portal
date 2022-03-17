const PROFILE_GETDATA = 'PROFILE_GETDATA'
const PROFILE_GETDATA_FAIL = 'PROFILE_GETDATA_FAIL'
const SHOW_LOADING_PROFILE = 'SHOW_LOADING_PROFILE'
import axios from 'axios'

const initState = {
  data: [],
  loading: true
}

const ProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case PROFILE_GETDATA:
      return {
        data: action.payload,
        loading: false
      }
    case SHOW_LOADING_PROFILE:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}
export default ProfileReducer

export const getProfileApi = () => async(dispatch) => {
  try {
    const data = await axios.get('https://6215ef287428a1d2a354d464.mockapi.io/Profile')
    dispatch({ type: PROFILE_GETDATA, payload: data.data })
  } catch (error) {
    dispatch({ type: PROFILE_GETDATA_FAIL, payload: error })
  }
}

export const showLoadingProfile = (data) => (dispatch) => {
  dispatch({
    type: SHOW_LOADING_PROFILE,
    payload: data
  })
}
