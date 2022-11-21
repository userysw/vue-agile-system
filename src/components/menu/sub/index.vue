<script lang="ts" name="MenuSub" setup>
import { computed } from 'vue'
import MenuSuper from '../super/index.vue'
import MenuItem from '../item/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const IconKeys = Object.keys(ElementPlusIconsVue)
const IconComponents = Object.values(ElementPlusIconsVue)

const props = defineProps({
  menu: {
    type: Object,
    required: true
  }
})

const id = computed(() => props.menu?.id ?? new Date().getTime() + '')
const name = computed(() => props.menu?.name ?? '默认名称')
const children = computed(() => props.menu?.children || [])
const icon = computed(() => props.menu?.icon || '')
// 默认设置平台图标
let iconComponent = ElementPlusIconsVue['Platform']
if (icon.value) {
  const index = IconKeys.indexOf(icon.value)
  if (index > -1) {
    iconComponent = IconComponents[index]
  }
}
</script>

<template>
  <el-sub-menu :index="id">
    <template #title>
      <el-icon size="16px">
        <component :is="iconComponent"></component>
      </el-icon>
      <span :data-index="id">{{ name }}</span>
    </template>
    <template v-for="child in children" :key="child.id">
      <MenuSuper v-if="child.children.length > 0" :menu="child" />
      <MenuItem v-else :menu="child" />
    </template>
  </el-sub-menu>
</template>

<style lang="scss" scoped>

</style>