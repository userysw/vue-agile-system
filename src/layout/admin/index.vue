<script lang="ts">
import { useNavsStore } from '@/stores/navs'
import { useTabsStore } from '@/stores/tabs'
import { useRoutesStore } from '@/stores/routes'

export default {
  // 组件内路由守卫，路由进入
  beforeRouteEnter(to, from, next) {
    const path = to.path

    const navsStore = useNavsStore()
    const tabsStore = useTabsStore()
    const routesStore = useRoutesStore()
    
    next(vm => {
      if (path) {
        routesStore.addRoute(path)
        const nav = navsStore.list.find(nav => nav.path === path)
        if (nav) {
          tabsStore.addTab(nav)
          navsStore.index = nav.id
        }
      }
    })
  }
}
</script>

<script lang="ts" name="Admin" setup>
import { useRoute } from 'vue-router'
import System from './system/index.vue'
import User from './user/index.vue'
import Navs from './navs/index.vue'
// import Tabs from './tabs/index.vue'

const $route = useRoute()

const tabsStore = useTabsStore()
const routesStore = useRoutesStore()

const showTabs = tabsStore.tabs.length > 0
const paths = routesStore.list
const isKeepAlive = paths.includes($route.path)
</script>

<template>
  <el-container class="admin-container">
    <el-header height="60px" class="admin-header">
      <!-- 系统信息 -->
      <System />

      <!-- 用户信息 -->
      <User />
    </el-header>
    <el-container>
      <el-aside class="admin-aside" width="240px">
        <!-- 导航栏 -->
        <Navs />
      </el-aside>
      <el-container>
        <el-header v-show="showTabs" height="40px">
          <!-- 选项卡 当前打开的菜单 -->
          <!-- <Tabs /> -->
        </el-header>
        <el-main class="admin-main">
          <keep-alive v-if="isKeepAlive">
            <router-view />
          </keep-alive>
          <router-view v-else />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  .el-header,
  .el-main {
    margin: 0;
    padding: 0;
  }
}

.admin-container {

  .admin-header {
    padding: 0;
    background: $header-bgc;
    @include flex-row(space-between, center);
  }

  .admin-aside {
    background: $aside-bgc;
  }

  .admin-main {
    padding: 0;
  }
}
</style>