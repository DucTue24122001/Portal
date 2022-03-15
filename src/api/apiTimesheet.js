import axios from 'axios'
import { getCookie, STORAGEKEY } from '@/utils/storage'

const getUrlPrefix = () => '/'

const instance = axios.create({
  baseURL: `http://14.232.214.101:8111/api/v1/`
})

const token = getCookie(STORAGEKEY.ACCESS_TOKEN)
const addToken = () => {
  if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const getAllApiTable = async(url) => {
  try {
    addToken()
    const config = { params: {}}
    const response = await instance.get(getUrlPrefix() + url, config)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

export const getApiTable = async(url, page, pageSize) => {
  try {
    addToken()
    const config = { params: { page: page, limit: pageSize }}
    const response = await instance.get(getUrlPrefix() + url, config)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

export const getSortTable = async(url, search, sort, page, pageSize) => {
  try {
    addToken()
    const config = {
      params: { sortBy: 'id', order: sort, page: page, limit: pageSize }
    }
    const response = await instance.get(getUrlPrefix() + url, config)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

const _responseHandler = (response, url) => {
  const data = response.data
  return data
}

const _errorHandler = (err) => {
  if (err.response && err.response.status === 401) {
    // todo
  }
  throw err
}
