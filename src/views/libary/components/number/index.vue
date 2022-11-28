<template>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="小数点精度">
      <el-input-number size="medium" v-model="config.precision" :min="0" :max="5" :step="1"></el-input-number>
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="增减数值">
      <el-input-number size="medium" v-model="config.step" :min="step" :step="step"></el-input-number>
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="范围限制">
      <el-switch v-model="config.range" />
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24" v-if="config.range">
    <el-form-item label="最小数值">
      <el-input-number size="medium" v-model="config.min" :step="step" :precision="config.precision"></el-input-number>
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24" v-if="config.range">
    <el-form-item label="最大数值">
      <el-input-number size="medium" v-model="config.max" :min="config.min" :step="step" :precision="config.precision"></el-input-number>
    </el-form-item>
  </el-col>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { INumber } from '../../interfaces/config';
import useMinMax from '../useMinMax';

export default defineComponent({
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { config } = props

    useMinMax(config as INumber, ['min', 'max'], [config.min, config.max])

    const step = ref(1)

    watch(() => config.precision, (n: number, o: number) => {
      // NaN
      if (isNaN(n)) {
        config.precision = o
      }
      // number
      else {
        let zeroCount = 1 / Math.pow(10, n)
        config.step = step.value = zeroCount
      }
      console.log(config.precision);
      
    })

    return {
      config,
      
      step
    }
  }
});
</script>

<style lang="scss" scoped>

</style>