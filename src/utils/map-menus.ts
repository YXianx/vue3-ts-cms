import { IBreadcrumb } from '@/base-ui/yx-breadcrumb'
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

/**
 * 当前路由字符串匹配菜单路由对象
 * @param userMenus 用户菜单树
 * @param currentPath 当前路由
 * @returns 路由对象
 */
export function pathMapToMenu(userMenus: any[], currentPath: string): any {
  for (const menu of userMenus) {
    // 二级路由
    if (menu.type === 2) {
      if (menu.url === currentPath) {
        return menu
      }
    } else if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        return findMenu
      }
    }
  }
}

export function pathMapToBreadcrumb(
  userMenus: any[],
  currentPath: string
): any {
  const breadcrumbs: IBreadcrumb[] = []
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(userMenus, currentPath)
      if (findMenu) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: findMenu.name, path: findMenu.url })

        return breadcrumbs
      }
    }
  }
}
