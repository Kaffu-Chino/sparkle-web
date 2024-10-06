import axios, { type AxiosRequestConfig, type AxiosResponse, type Method } from 'axios'
import type { IResponseWithoutData } from './models/responseTypes'
import { useUserStore } from '~/stores/userStore'

// 创建 axios 实例
const axiosRequest = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.API_URL_HOST as string | undefined,
  // 请求超时时间
  timeout: 60000
})

// 异常拦截处理器
const errorAxiosHandler = (error: { response: AxiosResponse<IResponseWithoutData> }) => {
  const userStore = useUserStore()
  if (error.response.status === 403) {
    userStore.cleanUserStore()
  }
  // console.log(`err${error}`)
  ElNotification.error({
    title: `${error.response.status} ${error.response.statusText}`,
    message: error.response.data.message
  })
  return Promise.reject(error)
}

// request interceptor
axiosRequest.interceptors.request.use((config) => {
  return config
}, errorAxiosHandler)

// response interceptor
axiosRequest.interceptors.response.use((response: AxiosResponse<IResponseWithoutData>) => {
  if (!response.data.success) {
    ElNotification.error(response.data.message)
  }
  return response
}, errorAxiosHandler)

const request = <T>(
  url: string,
  method: Method,
  requestData?: object,
  config?: AxiosRequestConfig
) => {
  return axiosRequest.request<T, AxiosResponse<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: requestData,
    ...config
  })
}

export default request
