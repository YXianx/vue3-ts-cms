import YXRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'

// 实例化导出
const yxRequest = new YXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 本地缓存获取到token
      const token = localCache.getCache('token')
      if (token) {
        // 新版的axios AxiosRequestConfig类型中的headers可能会为undefined 所以此处要加个判断
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }

      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export { yxRequest }
