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
    <el-col :lg="12" :md="16" :sm="24" :xs="24">
      <el-form-item label="月份范围">
        <el-date-picker
          v-model="startToEnd"
          type="monthrange"
          value-format="YYYY-MM"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          size="medium"
          :clearable="false"
          @change="changeStartToEnd"
        />
      </el-form-item>
    </el-col>
  </template>

  <template v-if="isCount">
    <el-col :lg="6" :md="8" :sm="12" :xs="24">
      <el-form-item label="前多少月">
        <el-input-number size="medium" v-model="startNum" :step="1" />
      </el-form-item>
    </el-col>
    <el-col :lg="6" :md="8" :sm="12" :xs="24">
      <el-form-item label="后多少月">
        <el-input-number size="medium" v-model="endNum" :step="1" />
      </el-form-item>
    </el-col>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { IDate } from '../../interfaces/config';
import { TMonthFormat, TRangeType } from '../../types/datetime';
import useRangeType from '../useRangeType';
import dayjs from 'dayjs'

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
    
    const formatOptions = reactive<Array<TMonthFormat>>([
      'yyyy-MM',
      'yyyy-M',
      'yyyy年MM月',
      'yyyy年M月'
    ])

    const rangeOptions = reactive<Array<IRangeType>>([
      {
        label: '月份',
        value: 'range'
      },
      {
        label: '月数',
        value: 'count'
      }
    ])
    
    // 开始时间 - 结束时间  范围
    let startToEnd = ref([dayjs().date(-10).format('YYYY-MM'), dayjs().date(40).format('YYYY-MM')])

    function changeStartToEnd (val: Array<Date>) {
      config.start = val[0]
      config.end = val[1]
    }

    const { isRange, isCount, startStr, endStr, startNum, endNum } = useRangeType(config as IDate)

    return {
      config,
      formatOptions,
      rangeOptions,
      isRange,
      isCount,
      startStr,
      endStr,
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