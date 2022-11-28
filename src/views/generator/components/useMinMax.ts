import { watch } from "vue"

interface IMinMax {
  [key: string]: number
}

/*
 * @config：需要监听的对象
 * @props：[minStr, maxStr] 需要监听对象中的两个属性
 * @nums：[minNum, maxNum] 需要监听对象中两个属性对应的默认值
*/
export default function (config: IMinMax, props: [string, string], nums: [number, number]) {
  const minProp = props[0]
  const maxProp = props[1]

  const minNum = nums[0]
  const maxNum = nums[1]
  
  watch(() => config[minProp], (n: number, o: number) => {
    // NaN
    if (isNaN(n)) {
      if (o === minNum) {
        config[minProp] = minNum + 1
      } else {
        config[minProp] = minNum
      }
      config[maxProp] = maxNum
    }
    // number
    else {
      n >= config[maxProp] && (config[maxProp] = config[minProp] + maxNum)
    }
  })

  watch(() => config[maxProp], (n: number, o: number) => {
    // NaN
    if (isNaN(n)) {
      if (o === config[minProp] + maxNum) {
        config[maxProp] = config[minProp] + maxNum - 1
      } else {
        config[maxProp] = config[minProp] + maxNum
      }
    }
  })

  return {}
}