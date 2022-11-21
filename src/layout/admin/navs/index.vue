<script lang="ts" name="AdminNavs" setup>
import { storeToRefs } from 'pinia'
import { useNavsStore } from '@/stores/navs'
import { useRoutesStore } from '@/stores/routes';
import { useTabsStore } from '@/stores/tabs';
import { useRoute, useRouter } from 'vue-router';
import MenuSuper from '@/components/menu/super/index.vue'
import MenuItem from '@/components/menu/item/index.vue'
import type { Nav } from '@/interface/nav'

const { navIndex, navTree } = storeToRefs(useNavsStore())

const $route = useRoute()
const $router = useRouter()
const navsStore = useNavsStore()
const tabsStore = useTabsStore()
const routesStore = useRoutesStore()

// 是否折叠
const isCollapse = ref(false)

// 展开
function onOpen(key: string, keyPath: string) {
  // console.log(key, keyPath)
}

// 折叠
function onClose(key: string, keyPath: string) {
  // console.log(key, keyPath)
}

// 选中
function onSelect(index: string, indexPath: string) {
  // console.log(index)
  // console.log(indexPath)
  const nav: Nav | undefined = navsStore.navList.find(nav => nav.id === index)
  if (nav) {
    const { id, path } = nav
    const routePath = $route.path || ''
    if (path) {
      if (path === routePath) {
        return
      } else {
        tabsStore.addTab(nav)
        routesStore.routes.push(path)
        navsStore.navIndex = id
        $router.push(path)
      }
    } else {
      ElMessage.warning('暂无跳转链接')
    }
  }
}
</script>

<template>
  <el-menu :default-active="navIndex" class="el-menu-vertical-demo" :collapse="isCollapse" @open="onOpen" @close="onClose" @select="onSelect">
    <template v-for="menu in navTree" :key="menu.id">
      <MenuSuper v-if="menu.children.length > 0" :menu="menu" />
      <MenuItem v-else :menu="menu" />
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
</style>