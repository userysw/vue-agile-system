<script lang="ts" name="MenuItem" setup>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const IconKeys = Object.keys(ElementPlusIconsVue)
const IconComponents = Object.values(ElementPlusIconsVue)

const props = defineProps({
  menu: {
    type: Object,
    required: true
  },
  eventName: {
    type: String,
    required: true
  }
})

const id = computed(() => props.menu?.id ?? new Date().getTime() + '')
const name = computed(() => props.menu?.name ?? '默认名称')
const icon = computed(() => props.menu?.icon ?? '')
// 默认设置平台图标
let iconComponent = ElementPlusIconsVue['Platform']
if (icon.value) {
  const index = IconKeys.indexOf(icon.value)
  if (index > -1) {
    iconComponent = IconComponents[index]
  }
}

const { proxy: { $bus } }: any = getCurrentInstance(); // 全局变量和方法

function choose() {
  $bus.emit(props.eventName, props.menu)
}
</script>

<template>
  <el-menu-item :index="id" @click="choose">
    <el-icon size="16px">
      <component :is="iconComponent"></component>
    </el-icon>
    <span slot="title" :data-index="id">{{ name }}</span>
  </el-menu-item>
</template>

<style lang="scss" scoped>

</style>