<template>
  <div class="login-account">
    <el-form
      :model="accountForm"
      :rules="rules"
      label-width="60px"
      ref="formRef"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="accountForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="accountForm.password"
          type="password"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus' // 为了获取到组件的类型所以此处import
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const formRef = ref<InstanceType<typeof ElForm>>()
    // 表单数据，当本地缓存有值时先用缓存(记住密码功能)
    const accountForm = reactive({
      username: localCache.getCache('username') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    // input校验
    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        {
          pattern: /^[0-9a-zA-Z]{5,10}$/,
          message: '用户名必须是5～10个字母或数字',
          trigger: 'blur'
        }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
          pattern: /^[0-9a-zA-Z]{5,}$/,
          message: '密码必须是5个以上的字母或数字',
          trigger: 'blur'
        }
      ]
    }
    // 登陆函数
    const loginAction = (isKeepPwd: boolean) => {
      // 表单校验
      formRef.value?.validate((valid) => {
        if (valid) {
          // 是否记住密码
          if (isKeepPwd) {
            localCache.setCache('username', accountForm.username)
            localCache.setCache('password', accountForm.password)
            localCache.setCache('keepPwd', true)
          } else {
            // 不记住密码则删除本地缓存
            localCache.removeCache('username')
            localCache.removeCache('password')
            localCache.removeCache('keepPwd')
          }

          store.dispatch('login/accountLoginAction', accountForm)
        }
      })
    }

    return {
      formRef,
      accountForm,
      rules,

      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.login-account {
}
</style>
