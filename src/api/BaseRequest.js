import axios from 'axios'
import { getCookie, STORAGEKEY } from '@/utils/storage'

const getUrlPrefix = () => '/'

const instance = axios.create({
  baseURL: process.env.API_URL
})

// instance.interceptors.request.use(function (config) {
//   console.log(config);
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });
// instance.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   return Promise.reject(error);
// });

const token = getCookie(STORAGEKEY.ACCESS_TOKEN)
if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

const get = async(url, params = {}) => {
  try {
    const config = { params: params }
    const response = await instance.get(getUrlPrefix() + url, config)
    return _responseHandler(response)
  } catch (error) {
    return _errorHandler(error)
  }
}

const put = async(url, data = {}) => {
  try {
    let response = {}
    if (data.toLocaleString() === '[object FormData]') {
      response = await instance.put(getUrlPrefix() + url, data)
    } else {
      response = await instance.put(getUrlPrefix() + url, data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const post = async(url, data = {}) => {
  try {
    const response = await instance.post(getUrlPrefix() + url, data)
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
  }
}

const del = async(url, data = {}) => {
  try {
    const response = await instance.delete(getUrlPrefix() + url, { data })
    return _responseHandler(response)
  } catch (error) {
    _errorHandler(error)
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

export {
  get, post, del, put
}
