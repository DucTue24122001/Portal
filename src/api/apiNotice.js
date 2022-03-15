import axios from 'axios'
import { getCookie, STORAGEKEY } from '@/utils/storage'

const getUrlPrefix = () => '/'

const instance = axios.create({
  baseURL: `https://621514c8cdb9d09717acf712.mockapi.io/`
})

const token = getCookie(STORAGEKEY.ACCESS_TOKEN)
const addToken = () => {
  if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const getAll = async(url) => {
  try {
    addToken()
    const config = { params: {}}
    const response = await instance.get(getUrlPrefix() + url, config)
    console.log('get all ', response)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

export const get = async(url, page, pageSize) => {
  try {
    addToken()
    const config = { params: { page: page, limit: pageSize }}
    const response = await instance.get(getUrlPrefix() + url, config)
    console.log('get', response)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

export const getSort = async(url, department, sort, status, inputSearch, page, pageSize) => {
  try {
    addToken()
    const config = {
      params: { sortBy: 'id', order: sort, page: page, limit: pageSize }
    }
    const response = await instance.get(getUrlPrefix() + url, config)
    console.log('get sort ', response)
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
