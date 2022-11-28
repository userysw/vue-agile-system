<template>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="最少字数">
      <el-input-number size="medium" v-model="config.minlength" :min="0" :step="1"></el-input-number>
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="最多字数">
      <el-input-number size="medium" v-model="config.maxlength" :min="config.minlength + 1" :step="1"></el-input-number>
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="显示字数">
      <el-select size="medium" v-model="config.showWordLimit" placeholder="请选择">
        <el-option label="是" :value="true"></el-option>
        <el-option label="否" :value="false"></el-option>
      </el-select>
    </el-form-item>
  </el-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { IText } from '../../interfaces/config';
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

    useMinMax(config as IText, ['minlength', 'maxlength'], [config.minlength, config.maxlength])

    return {
      config
    }
  }
});
</script>

<style lang="scss" scoped>

</style>