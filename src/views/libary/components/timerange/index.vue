<template>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="时间格式">
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
    <el-col :lg="12" :md="16" :sm="24" :xs="24">
      <el-form-item label="时间范围">
        <el-time-picker
          v-model="startToEnd"
          is-range
          :clearable="false"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
    </el-col>
  </template>

  <template v-if="isCount">
    <el-col :lg="6" :md="8" :sm="12" :xs="24">
      <el-form-item label="前多少秒">
        <el-input-number size="medium" v-model="startNum" :step="1" />
      </el-form-item>
    </el-col>
    <el-col :lg="6" :md="8" :sm="12" :xs="24">
      <el-form-item label="后多少秒">
        <el-input-number size="medium" v-model="endNum" :step="1" />
      </el-form-item>
    </el-col>
  </template>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { IDate } from '../../interfaces/config';
import { TDatetimeFormat, TRangeType } from '../../types/datetime';
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
    
    const formatOptions = reactive<Array<TDatetimeFormat>>([
      'yyyy-MM-dd HH:mm:ss',
      'yyyy-M-d H:m:s',
      'yyyy年MM月dd日 HH时mm分ss秒',
      'yyyy年M月d日 H时m分s秒'
    ])

    const rangeOptions = reactive<Array<IRangeType>>([
      {
        label: '时间',
        value: 'range'
      },
      {
        label: '秒数',
        value: 'count'
      }
    ])

    // 开始时间 - 结束时间  范围
    let startToEnd = ref([new Date(2022, 2, 2, 0, 0, 0), new Date(2022, 2, 2, 23, 59, 59)])

    function changeStartToEnd (val: Array<Date>) {
      config.start = val[0]
      config.end = val[1]
    }

    const { isRange, isCount, startNum, endNum } = useRangeType(config as IDate)

    return {
      config,
      formatOptions,
      rangeOptions,
      isRange,
      isCount,
      startToEnd,
      changeStartToEnd,
      startNum,
      endNum
    }
  }
});
</script>

<style lang="scss" scoped>

</style>