<script lang="ts" name="Super" setup>
import MenuSub from '../sub/index.vue'
import MenuItem from '../item/index.vue'

const props = defineProps({
  menu: {
    type: Object,
    required: true
  }
})

const id = computed(() => props.menu?.id ?? new Date().getTime() + '')
const name = computed(() => props.menu?.name ?? '默认名称')
const icon = computed(() => props.menu?.icon || '')
const children = computed(() => props.menu?.children || [])
</script>

<template>
  <el-sub-menu :index="id">
    <template #title>
      <!-- <i class="el-icon-" :class="icon" /> -->
      <span :data-index="id">{{ name }}</span>
    </template>
    <template v-for="child in children" :key="child.id">
      <MenuSub v-if="child.children.length > 0" :menu="child" />
      <MenuItem v-else :menu="child" />
    </template>
  </el-sub-menu>
</template>

<style lang="scss" scoped>

</style>