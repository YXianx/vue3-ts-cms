<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// defineComponent函数的作用是对vue组件内部参数的类型做限制和推导
// 如props的类型注解会随着我们写的数据自动推导
export default defineComponent({
  name: 'App'
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
