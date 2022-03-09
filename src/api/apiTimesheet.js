import axios from 'axios'

const getUrlPrefix = () => '/'

const instance = axios.create({
  baseURL: `https://621514c8cdb9d09717acf712.mockapi.io`
})

export const getAllApiTable = async(url) => {
  try {
    const config = { params: {}}
    const response = await instance.get(getUrlPrefix() + url, config)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

export const getApiTable = async(url, page, pageSize) => {
  try {
    const config = { params: { page: page, limit: pageSize }}
    const response = await instance.get(getUrlPrefix() + url, config)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

export const getSortTable = async(url, search, sort, page, pageSize) => {
  try {
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
