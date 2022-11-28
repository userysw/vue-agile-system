<template>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="可拖拽">
      <el-select size="medium" v-model="config.resize" placeholder="请选择">
        <el-option v-for="option in resizeOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
      </el-select>
    </el-form-item>
  </el-col>
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
    <el-form-item label="最小行数">
      <el-input-number size="medium" v-model="config.minRow" :min="1" :max="10" :step="1"></el-input-number>
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="最大行数">
      <el-input-number size="medium" v-model="config.maxRow" :min="config.minRow + 1" :max="config.minRow + 10" :step="1"></el-input-number>
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
import { defineComponent, reactive, watch } from 'vue';
import { ITextarea } from '../../interfaces/config';
import { TTextareaResize } from '../../types/textarea';
import useMinMax from '../useMinMax';

interface IResize {
  label: string
  value: TTextareaResize
}

export default defineComponent({
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { config } = props

    useMinMax(config as ITextarea, ['minlength', 'maxlength'], [config.minlenght, config.maxlength])
    
    useMinMax(config as ITextarea, ['minRow', 'maxRow'], [config.minRow, config.maxRow])

    const resizeOptions = reactive<Array<IResize>>([
      {
        label: '关闭',
        value: 'none'
      },
      {
        label: '仅横向',
        value: 'horizontal'
      },
      {
        label: '仅纵向',
        value: 'vertical'
      },
      {
        label: '横纵向',
        value: 'both'
      }
    ])

    return {
      config,
      resizeOptions
    }
  }
});
</script>

<style lang="scss" scoped>

</style>