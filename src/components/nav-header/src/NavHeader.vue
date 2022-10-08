<template>
  <div class="nav-header">
    <el-icon
      :size="25"
      :color="'#333'"
      class="nav-fold"
      @click="handleFoldClick"
    >
      <template v-if="!isFold">
        <Fold />
      </template>
      <template v-else>
        <Expand />
      </template>
    </el-icon>
    <div class="content">
      <span>面包屑</span>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import UserInfo from './cpns/UserInfo.vue'
export default defineComponent({
  components: {
    Fold,
    Expand,
    UserInfo
  },
  setup(props, { emit }) {
    const isFold = ref<boolean>(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('navFoldEvent', isFold.value)
    }
    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav-fold {
    cursor: pointer;
    margin-right: 10px;
  }
  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
