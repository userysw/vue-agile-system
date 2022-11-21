<script lang="ts" name="AdminNavs" setup>
import { storeToRefs } from 'pinia'
import { useNavsStore } from '@/stores/navs'
import { useRoutesStore } from '@/stores/routes';
import { useTabsStore } from '@/stores/tabs';
import { useRoute, useRouter } from 'vue-router';
import MenuSuper from './super/index.vue'
import MenuItem from './item/index.vue'
import type { Nav } from '@/interface/nav'

const { proxy: { $bus } }: any = getCurrentInstance(); // 全局变量和方法

const { navIndex, navTree } = storeToRefs(useNavsStore())

// 是否折叠
const isCollapse = ref(false)

function onOpen(key: string, keyPath: string) {
  // console.log(key, keyPath)
}

function onClose(key: string, keyPath: string) {
  // console.log(key, keyPath)
}

function onSelect(index: string, indexPath: string) {
  // console.log(index)
  // console.log(indexPath)
}

const eventName = ref('choose-admin-nav')

const $route = useRoute()
const $router = useRouter()
const navsStore = useNavsStore()
const tabsStore = useTabsStore()
const routesStore = useRoutesStore()

onMounted(() => {
  $bus.on(eventName.value, chooseAdminNav)
})

onBeforeMount(() => {
  $bus.off(eventName.value)
})
function chooseAdminNav(nav: Nav) {
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
</script>

<template>
  <el-menu :default-active="navIndex" class="el-menu-vertical-demo" :collapse="isCollapse" @open="onOpen" @close="onClose" @select="onSelect">
    <template v-for="menu in navTree" :key="menu.id">
      <MenuSuper v-if="menu.children.length > 0" :menu="menu" :eventName="eventName" />
      <MenuItem v-else :menu="menu" :eventName="eventName" />
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
</style>