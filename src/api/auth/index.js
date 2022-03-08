import { post } from '@/api/BaseRequest'
import { setCookie, STORAGEKEY } from '@/utils/storage'

export const useAuth = async ({ email, password }) => {
  const { data } = await post('auth/login', { email, password })
  if (data) {
    setCookie(STORAGEKEY.ACCESS_TOKEN, data.access_token)
  }
  return !!data
}

export const useChangePassword = async (params) => {
  const { data } = await post('user/change-password', params)
  return !!data
}
