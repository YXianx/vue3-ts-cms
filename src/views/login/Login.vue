<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
// 使用ts会用到defineComponent 使得vue组件更好的支持ts
import { defineComponent } from 'vue'
import LoginPanel from './cpns/LoginPanel.vue'
export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
