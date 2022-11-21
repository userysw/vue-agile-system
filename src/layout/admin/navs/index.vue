<script lang="ts" name="Navs" setup>
import { storeToRefs } from 'pinia'
import { useNavsStore } from '@/stores/navs'
import MenuSuper from './super/index.vue'
import MenuItem from './item/index.vue'

const { index, list, tree } = storeToRefs(useNavsStore())

const isCollapse = ref(false)
// const activeIndex = ref(index)

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
</script>

<template>
  <el-menu :default-active="index" class="el-menu-vertical-demo" :collapse="isCollapse" @open="onOpen" @close="onClose" @select="onSelect">
    <template v-for="menu in tree" :key="menu.id">
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