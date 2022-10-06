import { Module } from 'vuex'
import router from '@/router/index'
import type { ILoginState } from './types'
import type { IRootState } from '../types'
import type { IAccount } from '@/service/login/types'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'

import localCache from '@/utils/cache'

// Module需要传入两个泛型: 当前模块state的类型/根state的类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
    userMenus: []
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  actions: {
    /**
     * 账号登陆
     * @param param0 commit
     * @param payload args
     */
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1、登陆
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token) // token保存vuex
      localCache.setCache('token', token) // token保存到local storage

      // 2、请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo) // 用户信息保存到local storage

      // 3、获取用户权限菜单树
      const userMenuResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenuResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4、跳转首页
      router.push('/main')
    },

    /**
     * 从本地local storage缓存获取用户信息存入vuex
     * @param param0 commit
     */
    setupLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
