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
      <yx-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store/index'
import { useRoute } from 'vue-router'
import { Fold, Expand } from '@element-plus/icons-vue'
import UserInfo from './cpns/UserInfo.vue'
import YxBreadcrumb, { IBreadcrumb } from '@/base-ui/yx-breadcrumb/index'
import { pathMapToBreadcrumb } from '@/utils/map-menus'
export default defineComponent({
  components: {
    Fold,
    Expand,
    UserInfo,
    YxBreadcrumb
  },
  emits: ['navFoldEvent'],
  setup(props, { emit }) {
    // 折叠菜单按钮
    const isFold = ref<boolean>(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('navFoldEvent', isFold.value)
    }

    // 将store和route放进计算属性，使得当route改变面包屑能够动态跟着改变
    const breadcrumbs = computed(() => {
      const store = useStore()
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      return pathMapToBreadcrumb(userMenus, route.path)
    })

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
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
