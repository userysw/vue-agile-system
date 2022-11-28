import { watch } from "vue"

interface INum {
  [key: string]: number
}

/*
 * @config：需要监听的对象
 * @prop：需要监听对象中的属性
 * @num：需要监听对象中属性对应的默认值
*/
export default function (config: INum, prop: string, num: number) {
  watch(() => config[prop], (n: number, o: number) => {
    // NaN
    if (isNaN(n)) {
      if (o === num) {
        config[prop] = num + 1
      } else {
        config[prop] = num
      }
    }
  })

  return {}
}