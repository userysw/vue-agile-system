<script lang="ts" name="Builder" setup>
import axios from 'axios'
import components from './components/components'
import Libary from '../generator/components/index.vue'
import Layout from './layout/index.vue'
import Setting from './setting/index.vue'
import type { IConfig, IText, INumber, ISelect, ISwitch, ISlider, ITime, IDate, IDatetime, ICustom } from './interfaces/config'
import { types, getDataByType, checkData, buildJson } from './useType'

// 当前属性 type 属性值对应的组件
const component = shallowRef()

// 根据类型加载对应组件
function loadComponent(name: string) {
  return defineAsyncComponent(components['vv-' + name])
}

// 当前选中属性的索引
const activeIndex = ref(0)
</script>

<template>
  <el-container class="generator-container">
    <el-aside class="generator-libary">
      <Libary />
    </el-aside>
    <el-container>
      <el-main class="generator-main">
        <Layout />
      </el-main>
      <el-aside class="generator-setting">
        <Setting />
      </el-aside>
  </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  .el-aside,
  .el-main {
    margin: 0;
    padding: 0;
  }
}


.generator-container {

  .generator-libary {
    width: 160px;
    border-right: 1px solid #dddddd;
  }

  .generator-main {

  }

  .generator-setting {
    width: 360px;
    border-left: 1px solid #CCCCCC;
  }
}
</style>
