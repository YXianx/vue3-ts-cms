<template>
  <div class="nav-menu">
    <div class="logo">
      <span class="title">Vue3+TS</span>
    </div>

    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      :collapse="collapse"
      :collapse-transition="false"
    >
      <template v-for="(item, index) in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <!-- 带有子菜单的一级菜单 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon><location /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <!-- 二级菜单 -->
              <router-link :to="subItem.url" custom v-slot:default="props">
                <el-menu-item :index="subItem.id + ''" @click="props.navigate">
                  <template #default>
                    <span>{{ subItem.name }}</span>
                  </template>
                </el-menu-item>
              </router-link>
            </template>
          </el-sub-menu>
        </template>
        <!-- 没有子菜单的一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="index + 1 + ''">
            <template #default>
              <el-icon><location /></el-icon>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
// TODO: el-menu折叠卡顿
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { Location } from '@element-plus/icons-vue'
import { pathMapToMenu } from '@/utils/map-menus'
import { keyBy } from 'lodash'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  components: {
    Location
  },
  setup() {
    // 此处的useStore为自己封装的函数
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)

    // 获取当前路由对应的default-active菜单项
    // TODO: el-menu的default-active属性不生效
    const route = useRoute()
    const currentPath = route.path
    const currentRoute = pathMapToMenu(userMenus.value, currentPath)
    const defaultActive = ref(currentRoute.id + '')

    return {
      userMenus,
      defaultActive
    }
  }
})
</script>

<style scoped lang="less">
.el-menu {
  border-right: none;
}
.nav-menu {
  height: 100%;
  .logo {
    height: 60px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
