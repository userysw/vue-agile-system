<script lang="ts" name="MenuItem" setup>
import { useNavsStore } from '@/stores/navs';
import { useRoutesStore } from '@/stores/routes';
import { useTabsStore } from '@/stores/tabs';
import { useRoute, useRouter } from 'vue-router';

  const navsStore = useNavsStore()
  const tabsStore = useTabsStore()
  const routesStore = useRoutesStore()

  const props = defineProps({
    menu: {
      type: Object,
      required: true
    }
  })

  const id = computed(() => props.menu?.id ?? new Date().getTime() + '')
  const name = computed(() => props.menu?.name ?? '默认名称')
  const path = computed(() => props.menu?.path ?? '')
  const icon = computed(() => props.menu?.icon ?? '')

  const $route = useRoute()
  const $router = useRouter()

  function choose() {
    const routePath = $route.path || ''
    if (path) {
      if (path.value === routePath) {
        return
      } else {
        tabsStore.addTab(props.menu)
        routesStore.list.push(path.value)
        navsStore.index = id.value
        $router.push(path.value)
      }
    } else {
      ElMessage.warning('暂无跳转链接')
    }
  }
</script>

<template>
  <el-menu-item :index="id" @click="choose">
    <!-- <i class="el-icon-" :class="icon" /> -->
    <span slot="title" :data-index="id">{{ name }}</span>
  </el-menu-item>
</template>

<style lang="scss" scoped>

</style>