<template>
  <div class="login-phone">
    <el-form :model="phoneForm" :rules="rules" label-width="80px">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phoneForm.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="verify-area">
          <el-input v-model="phoneForm.code" type="password" />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const phoneForm = reactive({
      num: '',
      code: ''
    })

    const rules = {
      num: [
        {
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          pattern: /^[0-9]{11}$/,
          message: '请输入11位手机号',
          trigger: 'blur'
        }
      ],
      code: [
        {
          required: true,
          message: '请输入短信验证码',
          trigger: 'blur'
        }
      ]
    }

    const loginAction = () => {
      console.log('phone login')
    }

    return {
      phoneForm,
      rules,
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.login-phone {
  .verify-area {
    display: flex;
    .get-btn {
      margin-left: 5px;
    }
  }
}
</style>
