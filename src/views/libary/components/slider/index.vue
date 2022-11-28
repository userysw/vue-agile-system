<template>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="范围限制">
      <el-switch v-model="config.range" />
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24" v-if="config.range">
    <el-form-item label="范围最小值">
      <el-input-number size="medium" v-model="config.min" :min="0" :step="1"></el-input-number>
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24" v-if="config.range">
    <el-form-item label="范围最大值">
      <el-input-number size="medium" v-model="config.max" :min="config.min + 1" :step="1"></el-input-number>
    </el-form-item>
  </el-col>
  
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="增减数值">
      <el-input-number size="medium" v-model="config.step" :min="0.00001" :step="0.00001"></el-input-number>
    </el-form-item>
  </el-col>

  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="显示提示">
      <el-switch v-model="config.showTooltip" />
    </el-form-item>
  </el-col>

  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="显示间断点">
      <el-switch v-model="config.showStops" />
    </el-form-item>
  </el-col>

  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="显示计数器">
      <el-switch v-model="config.showInput" />
    </el-form-item>
  </el-col>

  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="竖向模式">
      <el-switch v-model="config.vertical" />
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24" v-if="config.vertical">
    <el-form-item label="高度">
      <el-input-number size="medium" v-model="config.height" :min="100" :max="1000" :step="10"></el-input-number>
    </el-form-item>
  </el-col>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { ISlider } from '../../interfaces/config';
import useMinMax from '../useMinMax';
import useNumber from '../useNumber';

export default defineComponent({
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { config } = props

    useMinMax(config as ISlider, ['min', 'max'], [config.min, config.max])

    useNumber(config as ISlider, 'step', config.step)

    useNumber(config as ISlider, 'height', config.height)

    watch(() => config.min, (n: number) => {
      if (n >= config.max) {
        config.max = n + 1
      }
    })

    return {
      config
    }
  }
});
</script>

<style lang="scss" scoped>

</style>