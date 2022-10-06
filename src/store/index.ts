import { createStore, useStore as useVuexStore } from 'vuex'
import type { Store } from 'vuex'
import type { IRootState, IStoreType } from './types'
import login from './login/login'

const store = createStore<IRootState>({
  state: {
    name: 'coder',
    num: 1
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

/**
 * 初始化设置store
 */
export function setupStore() {
  // 从缓存保存用户信息到vuex
  store.dispatch('login/setupLocalLogin')
}

export function useStore(): Store<IStoreType> {
  // useStore取别名，为了让类型有注解及有提示所以做了很多事
  return useVuexStore()
}

export default store
