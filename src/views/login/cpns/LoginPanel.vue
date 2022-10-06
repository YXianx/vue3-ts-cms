<template>
  <div class="login-panel">
    <div class="title">后台管理系统</div>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span> 账号登陆</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span> 手机登陆</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPwd">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick">
      立即登陆
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'
import localCache from '@/utils/cache'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 当前选中页(account or phone)
    const currentTab = ref('account')
    // 记住密码勾选状态缓存
    const isKeepPwd = ref(localCache.getCache('keepPwd') ?? false)
    // ref为null则类型推导出来的也是null类型所以ts不让调用loginAction，不写默认值则为any
    // ref<InstanceType<typeof LoginAccount>>() 通过instanceType可以拿到实例的具体类型，使得ts能够检测到类型内部的对应属性函数进行提示
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    /**
     * 登陆按钮点击事件 区分账号 or 短信登陆
     */
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPwd.value)
      } else {
        phoneRef.value?.loginAction()
      }
    }

    return {
      currentTab,
      isKeepPwd,

      handleLoginClick,

      accountRef,
      phoneRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;
  .title {
    font-size: 25px;
    margin: 15px 0px;
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
