import type { IConfig, IText, ITextarea, INumber, ISelect, ISwitch, ISlider, ITime, ITimeRange, IYear, IMonth, IWeek, IDay, IDays, IDayRange, IDate, IDatetime, IDatetimeRange, ICustom } from './interfaces/config'
import type { TTypes } from './types/type'

type IAll = IConfig | IText | INumber | ISelect | ISwitch | ISlider | ITime | IDate | IDatetime

interface IProp {
  [key: string]: IAll
}

interface IAny {
  [key: string]: any
}

export const types = [
  {
    key: '单行文本框',
    value: 'text'
  },
  {
    key: '多行文本框',
    value: 'textarea'
  },
  {
    key: '计数器',
    value: 'number'
  },
  {
    key: '下拉选择器',
    value: 'select'
  },
  {
    key: '开关',
    value: 'switch'
  },
  {
    key: '滑块',
    value: 'slider'
  },
  {
    key: '日期时间',
    value: 'datetime'
  },
  {
    key: '日期时间范围',
    value: 'datetimerange'
  },
  {
    key: '日期单选',
    value: 'date'
  },
  {
    key: '日期多选',
    value: 'dates'
  },
  {
    key: '日期范围',
    value: 'daterange'
  },
  {
    key: '月份',
    value: 'month'
  },
  {
    key: '年份',
    value: 'year'
  },
  {
    key: '时间',
    value: 'time'
  },
  {
    key: '时间范围',
    value: 'timerange'
  },
  // {
  //   key: '周选择器',
  //   value: 'week'
  // },
  {
    key: '自定义',
    value: 'custom'
  }
]

export function getDataByType (type: TTypes): IAll {
  let config: IConfig = {
    name: '', // 属性名称
    label: '', // 属性别名
    hidden: false, // 是否隐藏
    readonly: false, // 是否只读
    placeholder: '', // 提示信息
    type: '', // 数据类型
    required: false, // 必填
  }
  switch (type) {
    case '':
      return config

    case 'text':
      let textConfig: IText = {
        ...config,
        minlength: 0, // 最小输入长度
        maxlength: 20, // 最大输入长度
        showWordLimit: true, // 是否显示输入字数统计
      }
      return textConfig

    case 'textarea':
      let textareaConfig: ITextarea = {
        ...config,
        minlength: 0, // 最小输入长度
        maxlength: 500, // 最大输入长度
        minRow: 1, // 最小行数
        maxRow: 4, // 最大行数
        resize: 'none', // 控制是否能被用户缩放
        showWordLimit: true // 是否显示输入字数统计
      }
      return textareaConfig

    case 'number':
      let numberConfig: INumber = {
        ...config,
        min: 0, // 最小值
        max: 100, // 最大值
        range: false, // 是否开启范围选择
        step: 1, // 递增递减的数值控制
        precision: 0 // 精度 必须是一个非负整数，并且不能小于 step 的小数位数
      }
      return numberConfig

    case 'select':
      let selectConfig: ISelect = {
        ...config,
        multiple: false, // 是否支持多选
        source: 'api', // 0：动态字典   1：静态JSON
        json: [{
          key: '',
          type: 'string',
          value: ''
        }], // 静态JSON数据
        param: '' // 动态字典请求接口地址
      }
      return selectConfig

    case 'switch':
      let switchConfig: ISwitch = {
        ...config,
        activeColor: '#409EFF', // 打开时的背景色
        inactiveColor: '#C0CCDA', // 关闭时的背景色
        activeText: '是', // 打开时的文字描述
        inactiveText: '否' // 关闭时的文字描述
      }
      return switchConfig

    case 'slider':
      let sliderConfig: ISlider = {
        ...config,
        vertical: false, // 是否开启竖向模式
        height: 100, // 仅在竖向模式中生效 单位像素
        range: false, // 是否开启范围选择
        min: 0, // 范围选择最小值
        max: 100, // 范围选择最大值
        showTooltip: true, // 是否显示Tooltip
        step: 1, // 递增递减的数值控制
        showStops: true, // 是否显示间断点
        showInput: false, // 是否显示计数器
      }
      return sliderConfig

    case 'datetime':
      let datetimeConfig: IDatetime = {
        ...config,
        format: 'yyyy-MM-dd HH:mm:ss', // 时间格式
        start: '', // 取值范围的开始日期时间
        end: '', // 取值范围的结束日期时间
        range: false, // 是否开启时间范围限制
        rangeType: 'count' // 时间范围类型
      }
      return datetimeConfig

    case 'datetimerange':
      let datetimerangeConfig: IDatetimeRange = {
        ...config,
        format: 'yyyy-MM-dd HH:mm:ss', // 时间格式
        start: '', // 取值范围的开始日期时间
        end: '', // 取值范围的结束日期时间
        range: false, // 是否开启时间范围限制
        rangeType: 'count' // 时间范围类型
      }
      return datetimerangeConfig

    case 'date':
      let dayConfig: IDay = {
        ...config,
        format: 'yyyy-MM-dd', // 时间格式
        start: '', // 取值范围的开始时间
        end: '', // 取值范围的结束时间
        range: false, // 是否开启时间范围限制
        rangeType: 'count' // 时间范围类型
      }
      return dayConfig

    case 'dates':
      let daysConfig: IDays = {
        ...config,
        format: 'yyyy-MM-dd', // 时间格式
        start: '', // 取值范围的开始时间
        end: '', // 取值范围的结束时间
        range: false, // 是否开启时间范围限制
        rangeType: 'count' // 时间范围类型
      }
      return daysConfig

    case 'daterange':
      let daterangeConfig: IDayRange = {
        ...config,
        format: 'yyyy-MM-dd', // 时间格式
        start: '', // 取值范围的开始时间
        end: '', // 取值范围的结束时间
        range: false, // 是否开启时间范围限制
        rangeType: 'count' // 时间范围类型
      }
      return daterangeConfig

    case 'week':
      let weekConfig: IWeek = {
        ...config,
        format: 'yyyy第WW周', // 时间格式
        start: '', // 取值范围的开始时间
        end: '', // 取值范围的结束时间
        range: false, // 是否开启时间范围限制
        rangeType: 'count' // 时间范围类型
      }
      return weekConfig

    case 'month':
      let monthConfig: IMonth = {
        ...config,
        format: 'yyyy-MM', // 时间格式
        start: '', // 取值范围的开始时间
        end: '', // 取值范围的结束时间
        range: false, // 是否开启时间范围限制
        rangeType: 'count' // 时间范围类型
      }
      return monthConfig

    case 'year':
      const currYear = new Date().getFullYear()
      let yearConfig: IYear = {
        ...config,
        format: 'yyyy', // 时间格式
        start: currYear - 3 + '', // 取值范围的开始年份
        end: currYear + 3 + '', // 取值范围的结束年份
        range: false, // 是否开启时间范围限制
        rangeType: 'count' // 时间范围类型
      }
      return yearConfig

    case 'time':
      let timeConfig: ITime = {
        ...config,
        format: 'HH:mm:ss', // 时间格式
        start: '', // 取值范围的开始时间
        end: '', // 取值范围的结束时间
        range: false, // 是否开启时间范围限制
        rangeType: 'count' // 时间范围类型
      }
      return timeConfig

    case 'timerange':
      let timerangeConfig: ITimeRange = {
        ...config,
        format: 'HH:mm:ss', // 时间格式
        start: '', // 取值范围的开始时间
        end: '', // 取值范围的结束时间
        range: false, // 是否开启时间范围限制
        rangeType: 'count' // 时间范围类型
      }
      return timerangeConfig

    case 'custom':
      let customConfig: ICustom = {
        ...config,
      }
      return customConfig
  
    default:
      const exhaustiveCheck: never = type
      return config
  }
}

// 检查数据是否完整
export function checkData (config: IConfig, terms: string[]) {
  for (let i = 0; i < terms.length; i++) {
    if (config[terms[i]] === '') {
      console.log(terms[i] + '属性值为空')
      return terms[i]
    }
  }
  return ''
}

// 生成 props 数据
export function buildJson (configArr: IAll[]) {
  let props: IProp = {}
  let form: IAny = {}
  let rules: IAny = {}
  for (let i = 0; i < configArr.length; i++) {
    const config = configArr[i]
    buildData(config, props, form, rules)
  }
  console.log(props)
  return {
    props,
    form,
    rules
  }
}

// 生成数据
function buildData (config: IAll, props: IProp, form: IAny, rules: IAny) {
  let arr = []
  const { name, label, type, required, range, min, max, minRow, maxRow, minlength, maxlength } = config
  props[name] = {
    ...config
  }
  switch (type) {
    case '':
      form[name] = ''
      break

    case 'text':
      form[name] = ''

      if (required) {
        arr.push({
          required: true,
          message: label + '不能为空',
          trigger: 'blur'
        })
      }

      arr.push({
        min: minlength,
        max: maxlength,
        message: label + '长度应在' + minlength + '-' + maxlength,
        trigger: 'blur'
      })
      break

    case 'textarea':
      form[name] = ''

      if (required) {
        arr.push({
          required: true,
          message: label + '不能为空',
          trigger: 'blur'
        })
      }

      arr.push({
        min: minlength,
        max: maxlength,
        message: label + '长度应在' + minlength + '-' + maxlength,
        trigger: 'blur'
      })

      arr.push({
        min: minRow,
        max: maxRow,
        message: label + '行数应在' + minRow + '-' + maxRow,
        trigger: 'blur'
      })
      break

    case 'number':
      // 开启范围限制
      if (range) {
        form[name] = min

        arr.push({
          min: min,
          max: max,
          message: label + '大小应在' + min + '-' + max,
          trigger: 'blur'
        })
      } else {
        form[name] = 0
      }

      if (required) {
        arr.push({
          required: true,
          message: label + '不能为空',
          trigger: 'blur'
        })
      }
      break
      
    case 'select':
      form[name] = ''

      if (required) {
        arr.push({
          required: true,
          message: label + '不能为空',
          trigger: 'change'
        })
      }
      break

    case 'switch':
      form[name] = false
      break

    case 'slider':
      // 开启范围限制
      if (range) {
        form[name] = min
        
        arr.push({
          min: min,
          max: max,
          message: label + '大小应在' + min + '-' + max,
          trigger: 'change'
        })
      } else {
        form[name] = 0
      }

      if (required) {
        arr.push({
          required: true,
          message: label + '不能为空',
          trigger: 'change'
        })
      }
      break

    case 'datetime':
      form[name] = ''

      if (required) {
        arr.push({
          type: 'date',
          required: true,
          message: label + '不能为空',
          trigger: 'change'
        })
      }
      break

    case 'datetimerange':
      form[name + 'Start'] = ''
      form[name + 'End'] = ''
      form[name] = ''

      if (required) {
        arr.push({
          type: 'date',
          required: true,
          message: label + '不能为空',
          trigger: 'change'
        })
      }
      break

    case 'date':
      form[name] = ''

      if (required) {
        arr.push({
          type: 'date',
          required: true,
          message: label + '不能为空',
          trigger: 'change'
        })
      }
      break

    case 'dates':
      form[name] = ''

      if (required) {
        arr.push({
          type: 'date',
          required: true,
          message: label + '不能为空',
          trigger: 'change'
        })
      }
      break

    case 'daterange':
      form[name + 'Start'] = ''
      form[name + 'End'] = ''
      form[name] = ''

      if (required) {
        arr.push({
          type: 'date',
          required: true,
          message: label + '不能为空',
          trigger: 'change'
        })
      }
      break

    case 'week':
      form[name] = ''

      if (required) {
        arr.push({
          type: 'date',
          required: true,
          message: label + '不能为空',
          trigger: 'change'
        })
      }
      break

    case 'month':
      form[name] = ''

      if (required) {
        arr.push({
          type: 'date',
          required: true,
          message: label + '不能为空',
          trigger: 'change'
        })
      }
      break

    case 'year':
      form[name] = ''

      if (required) {
        arr.push({
          type: 'date',
          required: true,
          message: label + '不能为空',
          trigger: 'change'
        })
      }
      break

    case 'time':
      form[name] = ''

      if (required) {
        arr.push({
          type: 'date',
          required: true,
          message: label + '不能为空',
          trigger: 'change'
        })
      }
      break

    case 'timerange':
      form[name + 'Start'] = ''
      form[name + 'End'] = ''
      form[name] = ''

      if (required) {
        arr.push({
          type: 'date',
          required: true,
          message: label + '不能为空',
          trigger: 'change'
        })
      }
      break

    case 'custom':
      form[name] = ''
      break
  
    default:
      const exhaustiveCheck: never = type
      form[name] = ''
      break
  }
  if (arr.length > 0) {
    rules[name] = arr
  }
}