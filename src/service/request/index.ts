import axios from 'axios'
import type { AxiosInstance } from 'axios' // 导入instance及config的类型注解，使得实例有了约束和代码提示
import type { YXRequestConfig, YXRequestInterceptor } from './type'
import { ElLoading } from 'element-plus'

// loading动画标志位默认值
const DEFAULT_LOADING = false
class YXRequest {
  instance: AxiosInstance
  interceptors?: YXRequestInterceptor
  loading?: any
  showLoading?: boolean

  constructor(config: YXRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.isShowLoading ?? DEFAULT_LOADING

    // 1、自定义实例拦截器
    // 拦截后必须return，否则请求的参数会被一直拦住
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2、全局拦截器
    // 添加所有实例都会有的拦截器  请求：后拦截的先执行  响应：先拦截的先执行   通过调整代码顺序可以改变执行顺序，一般用不到
    this.instance.interceptors.request.use(
      (config) => {
        // loading动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '请求加载中...',
            background: 'rgba(0,0,0,0.6)'
          })
        }
        // console.log('所有实例都有的拦截器： 请求拦截成功')
        return config
      },
      (err) => {
        this.showLoading = DEFAULT_LOADING
        this.loading?.close()
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.showLoading = DEFAULT_LOADING
        this.loading?.close()

        // console.log('所有实例都有的拦截器： 响应拦截成功')
        return res.data // 拦截过滤不需要的数据
      },
      (err) => {
        this.showLoading = DEFAULT_LOADING
        this.loading?.close()
        // 请求错误拦截 判断错误码在页面上显示错误信息
        switch (err.response.status) {
          case 404:
            console.log('404!')
            break
        }
        return err
      }
    )
  }

  // 3、单个请求拦截器
  // 请求之前所做的事情可能是不一样的，所以单个请求拦截使得二次封装的axios很灵活
  // request config参数改为YXRequestConfig使得可以自定义单个请求的拦截器
  request<T>(config: YXRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 实例单独对config/res进行一些处理转化 相当于request函数也可以自定义属于自己的拦截器(非全局的、非实例的)
      if (config.isShowLoading) {
        this.showLoading = config.isShowLoading
      }
      // 单次请求拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // TODO:此处的<any, T>并不是很理解
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应拦截
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)

          // 重置标志位，因为大家都是用的同一实例下的showLoading，重置该标志后才不会干扰到其他需要loading动画的请求
          this.showLoading = DEFAULT_LOADING
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: YXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: YXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: YXRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T>(config: YXRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default YXRequest
