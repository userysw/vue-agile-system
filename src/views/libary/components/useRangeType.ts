import { ref, computed, watch } from "vue"
import { IDate } from "../interfaces/config"

export default function (config: IDate) {
  // 开启范围限制后，范围限制类型是否是 range
  const isRange = computed(() => {
    return config.range && config.rangeType === 'range'
  })

  // 开启范围限制后，范围限制类型是否是 count
  const isCount = computed(() => {
    return config.range && config.rangeType === 'count'
  })

  let startStr = ref(config.start)
  let endStr = ref(config.end)  

  watch(() => startStr.value, (n: number | string) => {
    if (n > endStr.value) {
      endStr.value = typeof n === 'number' ? n + 1 + '' : parseInt(n) + 1 + ''
    }
    config.start = startStr.value
    config.end = endStr.value
  })

  watch(() => endStr.value, (n: number | string) => {
    if (n < startStr.value) {
      startStr.value = typeof n === 'number' ? n - 1 + '' : parseInt(n) - 1 + ''
    }
    config.start = startStr.value
    config.end = endStr.value
  })

  const start_default = 3
  const end_default = 3

  let startNum = ref(start_default)
  let endNum = ref(end_default)

  watch(() => startNum.value, (n: number, o: number) => {
    // NaN
    if (isNaN(n)) {
      if (o === start_default) {
        startNum.value = start_default + 1
      } else {
        startNum.value = start_default
      }
    } else {
      if ((0 - n) >= endNum.value) {
        endNum.value = 0 - n + 1
      }
      config.start = startNum.value
      config.end = endNum.value
    }
  })

  watch(() => endNum.value, (n: number, o: number) => {
    // NaN
    if (isNaN(n)) {
      if (o === end_default) {
        endNum.value = end_default + 1
      } else {
        endNum.value = end_default
      }
    } else {
      if ((0 - n) >= startNum.value) {
        startNum.value = 0 - n + 1
      }
      config.start = startNum.value
      config.end = endNum.value
    }
  })

  return {
    isRange,
    isCount,
    startStr,
    endStr,
    startNum,
    endNum
  }
}