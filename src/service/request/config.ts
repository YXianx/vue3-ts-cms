// 环境变量 选择不同的请求配置项
let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://xianx.top/prod'
} else {
  BASE_URL = 'http://xianx.top/test'
}

export { BASE_URL, TIME_OUT }
