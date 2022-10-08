import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' // type表示导入的是数据类型

import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    name: 'main',
    path: '/main',
    component: () => import('@/views/main/Main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/notfound/NotFound.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

// 路由守卫
router.beforeEach((to) => {
  // 当访问的不是登陆页，就检查本地是否有token，没有则强制跳转到登陆页
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
