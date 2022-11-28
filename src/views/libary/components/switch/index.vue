<template>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="打开描述">
      <el-input size="medium" v-model="config.activeText" :minlength="0" :maxlength="6" placeholder="打开时的文字描述"></el-input>
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="关闭描述">
      <el-input size="medium" v-model="config.inactiveText" :minlength="0" :maxlength="6" placeholder="关闭时的文字描述"></el-input>
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="打开颜色">
      <el-color-picker size="default " v-model="config.activeColor" @change="changeActiveColor" />
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="关闭颜色">
      <el-color-picker size="default " v-model="config.inactiveColor" @change="changeInactiveColor" />
    </el-form-item>
  </el-col>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

export default defineComponent({
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { config } = props

    watch(() => config.minlength, (n: number) => {
      config.maxlength = n + 1
    })

    // 修改打开颜色
    const changeActiveColor = (color: string) => {
      // 清空颜色时，给默认颜色
      if (!color) {
        config.activeColor = '#409EFF'
      }
    }

    // 修改关闭颜色
    const changeInactiveColor = (color: string) => {
      // 清空颜色时，给默认颜色
      if (!color) {
        config.inactiveColor = '#C0CCDA'
      }
    }

    return {
      config,
      changeActiveColor,
      changeInactiveColor
    }
  }
});
</script>

<style lang="scss" scoped>

</style>