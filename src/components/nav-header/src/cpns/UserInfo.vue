<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar
        class="user-head"
        :size="30"
        :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
      />
      <span>{{ userName }}</span>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-icon><CircleClose /></el-icon>
          退出登录
        </el-dropdown-item>
        <el-dropdown-item divided>
          <el-icon><Avatar /></el-icon>
          用户信息
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon><Monitor /></el-icon>
          系统管理
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  ArrowDown,
  CircleClose,
  Avatar,
  Monitor
} from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useStore } from '@/store/index'
export default defineComponent({
  components: {
    ArrowDown,
    CircleClose,
    Avatar,
    Monitor
  },
  setup() {
    const store = useStore()
    const userName = computed(() => store.state.login.userInfo.name)

    return {
      userName
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  .user-head {
    margin: 0 5px;
  }
}
</style>
