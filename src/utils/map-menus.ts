import type { RouteRecordRaw } from 'vue-router'

export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  const allRoutes: RouteRecordRaw[] = []

  // 1、默认加载全部路由route
  const files = require.context('../router/main', true, /\.ts$/) // require.context webpack中的函数，获取指定目录底下的文件类型
  files.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2、根据路由表注册对应路由 递归函数 递归用户菜单树
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // 在allRoutes中匹配用户菜单树中的路由
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
        }
      } else if (menu.type === 1) {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
