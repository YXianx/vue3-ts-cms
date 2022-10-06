// 抽取封装
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 通过设计拦截器接口，使得拦截器内容可供自定义
export interface YXRequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T // response拦截器的参数类型和返回类型从any改成T类型注解  一级一级往下传递泛型，有点绕需要多练习
  responseInterceptorCatch?: (err: any) => any
}

// 继承AxiosRequestConfig，在原有基础上扩展interceptors属性
// interceptors的内容可选传、也可都不传，利用可选参数和可选链实现
export interface YXRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YXRequestInterceptor<T>
  isShowLoading?: boolean
}
