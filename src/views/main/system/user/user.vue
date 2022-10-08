<template>
  <div class="user">
    <div class="search">
      <yx-form v-bind="searchFormConfig" />
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import YxForm from '@/base-ui/yx-form/index'
import { searchFormConfig } from './config/search.config' // 表单配置文件
export default defineComponent({
  components: {
    YxForm
  },
  name: 'user',
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped>
.user {
  background-color: #fff;
  border-radius: 6px;
}
</style>
