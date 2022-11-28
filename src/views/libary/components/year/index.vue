<template>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="日期格式">
      <el-select size="medium" v-model="config.format" placeholder="请选择">
        <el-option v-for="option in formatOptions" :key="option" :label="option" :value="option"></el-option>
      </el-select>
    </el-form-item>
  </el-col>

  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="范围限制">
      <el-switch v-model="config.range" />
    </el-form-item>
  </el-col>

  <el-col :lg="6" :md="8" :sm="12" :xs="24" v-if="config.range">
    <el-form-item label="范围类型">
      <el-select size="medium" v-model="config.rangeType" placeholder="请选择">
        <el-option v-for="option in rangeOptions" :key="option" :label="option.label" :value="option.value"></el-option>
      </el-select>
    </el-form-item>
  </el-col>

  <template v-if="isRange">
    <el-col :lg="6" :md="8" :sm="12" :xs="24">
      <el-form-item label="开始年份">
        <el-date-picker
          v-model="startStr"
          type="year"
          value-format="YYYY"
          size="medium"
          :clearable="false"
        />
      </el-form-item>
    </el-col>
    <el-col :lg="6" :md="8" :sm="12" :xs="24">
      <el-form-item label="结束年份">
        <el-date-picker
          v-model="endStr"
          type="year"
          value-format="YYYY"
          size="medium"
          :clearable="false"
        />
      </el-form-item>
    </el-col>
  </template>

  <template v-if="isCount">
    <el-col :lg="6" :md="8" :sm="12" :xs="24">
      <el-form-item label="前多少年">
        <el-input-number size="medium" v-model="startNum" :step="1" />
      </el-form-item>
    </el-col>
    <el-col :lg="6" :md="8" :sm="12" :xs="24">
      <el-form-item label="后多少年">
        <el-input-number size="medium" v-model="endNum" :step="1" />
      </el-form-item>
    </el-col>
  </template>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { IDate } from '../../interfaces/config';
import { TYearFormat, TRangeType } from '../../types/datetime';
import useRangeType from '../useRangeType';

interface IRangeType {
  label: string,
  value: TRangeType
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
    
    const formatOptions = reactive<Array<TYearFormat>>([
      'yyyy',
      'yyyy年'
    ])

    const rangeOptions = reactive<Array<IRangeType>>([
      {
        label: '年份',
        value: 'range'
      },
      {
        label: '年数',
        value: 'count'
      }
    ])

    const { isRange, isCount, startStr, endStr, startNum, endNum } = useRangeType(config as IDate)

    return {
      config,
      formatOptions,
      rangeOptions,
      isRange,
      isCount,
      startStr,
      endStr,
      startNum,
      endNum
    }
  }
});
</script>

<style lang="scss" scoped>

</style>