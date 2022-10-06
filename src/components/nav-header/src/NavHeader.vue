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
    <span>Header</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    Fold,
    Expand
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
  .nav-fold {
    cursor: pointer;
    margin-right: 10px;
  }
}
</style>
