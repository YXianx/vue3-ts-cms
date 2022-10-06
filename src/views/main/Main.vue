<template>
  <div class="main">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '210px'" class="main-nav">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="main-header">
          <nav-header @navFoldEvent="handleFoldEvent" />
        </el-header>
        <el-main class="main-content">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NavMenu } from '@/components/nav-menu/index'
import { NavHeader } from '@/components/nav-header/index'
export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    /**
     * 接收nav-header传递的fold事件
     */
    const handleFoldEvent = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      handleFoldEvent
    }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f1f2f6;

  .main-header {
    background-color: #fff;
  }

  .main-nav {
    height: 100vh;
    background-color: #fff;
    transition: width 0.3s linear;
    -webkit-transition: width 0.15s;
    -moz-transition: width 0.15s;
    -webkit-transition: width 0.15s;
    -o-transition: width 0.15s;
  }
}
</style>
