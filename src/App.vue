<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = zhCn

const dragging = ref(false)
function updateDragging(val: boolean) {
  dragging.value = val
}
document.ondragend = () => {
  dragging.value = false
}
provide('dragging', {
  dragging,
  updateDragging
})
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style lang="scss" scoped></style>
