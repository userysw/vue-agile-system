<script lang="ts" name="" setup>
import type { Ref } from 'vue';
import components from '../components'

interface Component {
  id: string,
  name: string,
  params: object
}

interface Layout {
  discriminator: 'I-Layout',
  span: number,
  componentArr: Component[]
}

// 根据类型加载对应组件
function loadComponent(name: string) {
  return defineAsyncComponent(components['vv-' + name])
}

const props = defineProps({
  params: {
    validator(val: any) {
      return val.discriminator === 'I-Layout'
    },
    required: true
  }
})

let config = reactive<Layout>({
  discriminator: 'I-Layout',
  span: 24,
  componentArr: []
})

function initConfig() {
  config.componentArr.length = 0
  const { span, componentArr } = <Layout>props.params
  config.span = span ?? 24
  if (Array.isArray(componentArr)) {
    config.componentArr.push(...componentArr)
  }
}

watch(() => props.params, () => {
  initConfig()
}, {
  deep: true,
  immediate: true
})

const { dragging } = <any>inject('dragging')
function dragover(e: any) {
  const className = e.target.className
  if (dragging.value && className === 'drop-container') {
    e.preventDefault();
  } else {
    return false
  }
}

function drop(e: any) {
  
}
</script>

<template>
  <el-col :span="config.span">
    <el-row>
      <component v-for="item in config.componentArr" :is="loadComponent(item.name)" :params="item.params" :key="item.id"></component>
      <div class="operation-container">
        <el-icon class="copy">
          <i-ep-circlePlusFilled />
        </el-icon>
        <el-icon class="delete">
          <i-ep-circleCloseFilled />
        </el-icon>
      </div>
      <div class="drop-container" @dragover="dragover" @drop="drop"></div>
    </el-row>
  </el-col>
</template>

<style lang="scss" scoped>
.operation-container {
  text-align: left !important;
}
</style>