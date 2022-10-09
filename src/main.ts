import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { setupStore } from './store/index'
// import { yxRequest } from './service/index'

import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
app.use(store)
setupStore() // 刷新页面时重新保存用户数据到vuex 获取用户动态路由 注意：需要写在use router之前，先加载路由，router之后跳转才不会出现路由还没注册就跳到notfound的问题
app.use(router)
app.mount('#app')

// 根据响应内容定义接口，使得res数据能够智能提示
// interface DataType {
//   code: number
//   data: object[]
//   message: string
// }

// yxRequest
//   .get<DataType>({
//     url: '/tags/list',
//     isShowLoading: false
//   })
//   .then((res) => {
//     console.log(res)
//   })

// yxRequest.request({
//   url: '/articles/home/list',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('request单独拦截：请求拦截成功')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('request单独拦截：响应拦截成功')
//       return res
//     }
//   },
//   isShowLoading: true
// })
