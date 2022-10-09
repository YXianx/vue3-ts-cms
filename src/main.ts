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
setupStore()
app.use(router)
app.mount('#app')

/**
 * setupStore()写在app.use(router)后面产生的问题
 * 问题：在/main/xxx的子路由页面中刷新页面会跳转到NotFound页面，
 *      但是在router.beforeEach路由守卫打印router.getRoutes()是能看到子路由是有被注册的，打印to里面的目标path也是子路由。
 * bug分析：
 *      1、通过打印to还能看到path虽然为目标子路由，但是name却是notfound
 *      2、由于app.use(router)先执行导致获取了当前path，然后因为子路由还没被注册，所以当前子路由和notfound页面建立了关系
 *      3、当执行setupStore()动态注册路由的时候已经来不及了，之前的path已经和notfound页面建立了联系正在跳转
 *      4、等跳转完毕后，setupStore()也执行完毕，这时候beforeEach的回调才执行完毕，所以这时候打印router.getRoutes()是有显示注册的子路由的
 *      5、因为执行先后的关系这才导致了在/main/xx子路由刷新页面的时候跳转notfound页面的bug问题
 *
 */
