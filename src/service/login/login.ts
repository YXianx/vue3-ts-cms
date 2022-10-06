import { yxRequest } from '../index'
import type { IAccount, ILoginData, IDataType } from './types'

// 枚举类型方便维护
enum LOGIN_URL {
  LOGIN = '/login',
  USERINFO = '/users/', // /users/:id
  USERMENU = '/role/' // /role/:id/menu
}

/**
 * 账号密码登陆
 * @param account 账号密码
 */
export function accountLoginRequest(account: IAccount) {
  // 泛型类型注解使得代码更安全且有代码提示
  return yxRequest.post<IDataType<ILoginData>>({
    url: LOGIN_URL.LOGIN,
    data: {
      name: account.username,
      password: account.password
    },
    isShowLoading: true
  })
}

/**
 * 获取用户信息
 * @param id 用户id
 * @returns 用户信息
 */
export function requestUserInfoById(id: number) {
  return yxRequest.get<IDataType>({
    url: LOGIN_URL.USERINFO + id
  })
}

/**
 * 获取用户菜单树
 * @param id 用户信息roleId
 * @returns 菜单树
 */
export function requestUserMenuByRoleId(roleId: number) {
  return yxRequest.get<IDataType>({
    url: LOGIN_URL.USERMENU + roleId + '/menu'
  })
}
