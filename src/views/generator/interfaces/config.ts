import type { TTypes } from '../types/type'
import type { TTextareaResize } from '../types/textarea'
import type { TSelectSource } from '../types/select'
import type { TTimeFormat, TYearFormat, TMonthFormat, TWeekFormat, TDateFormat, TDatetimeFormat, TRangeType } from '../types/datetime'

interface IJson {
  key: string
  type: 'string' | 'number' | 'boolean'
  value: string | number | boolean
}

// 基本配置数据
export interface IConfig {
  [key: string]: any
  name: string // 属性名称
  label: string // 属性标签文本
  hidden: boolean // 是否隐藏
  readonly: boolean // 是否只读
  placeholder: string // 占位文本提示信息
  type: TTypes // 属性类型
  required: boolean // 必填
}

// type="text" 单行文本框的配置数据
export interface IText extends IConfig {
  minlength: number // 最小长度
  maxlength: number // 最大长度
  showWordLimit: boolean // 是否显示字数统计
}

// type="textarea" 多行文本框的配置数据
export interface ITextarea extends IConfig {
  minlength: number // 最小长度
  maxlength: number // 最大长度
  minRow: number // 最小行数
  maxRow: number // 最大行数
  resize: TTextareaResize // 控制是否能被用户缩放
  showWordLimit: boolean // 是否显示输入字数统计
}

// type="number" 计数器的配置数据
export interface INumber extends IConfig {
  precision: number // 精度 必须是一个非负整数，并且不能小于 step 的小数位数
  step: number // 递增递减的数值控制
  range: boolean // 是否开启范围选择
  min: number // 最小值
  max: number // 最大值
}

// type="select" 下拉选择器的配置数据
export interface ISelect extends IConfig {
  multiple: boolean, // 是否支持多选
  source: TSelectSource, // api：动态字典  json：静态JSON
  json: IJson[] // 静态JSON数据
  param: string // 动态字典请求接口地址
}

// type="switch" 开关器的配置数据
export interface ISwitch extends IConfig {
  activeColor: string // 打开时的背景色
  inactiveColor: string // 关闭时的背景色
  activeText: string // 打开时的文字描述
  inactiveText: string // 关闭时的文字描述
}

// type="slider" 滑块器的配置数据
export interface ISlider extends IConfig {
  vertical: boolean // 是否开启竖向模式
  height: number // 仅在竖向模式中生效 单位像素
  range: boolean // 是否开启范围选择
  min: number // 范围选择最小值
  max: number // 范围选择最大值
  showTooltip: boolean // 是否显示Tooltip
  step: number // 递增递减的数值控制
  showStops: boolean // 是否显示间断点
  showInput: boolean // 是否显示计数器
}

// 日期选择器的公用基本配置数据
export interface IDate extends IConfig {
  start: string | number // 取值范围的开始时间
  end: string | number // 取值范围的结束时间
  range: boolean // 是否开启时间范围限制
  rangeType: TRangeType // 范围类型
}

// type="datetime" 日期时间选择器的配置数据
export interface IDatetime extends IConfig, IDate {
  format: TDatetimeFormat // 日期格式
}

// type="datetimerange" 日期时间范围选择器的配置数据
export interface IDatetimeRange extends IDatetime {}

// type="year" 年份选择器的配置数据
export interface IYear extends IConfig, IDate {
  format: TYearFormat // 日期格式
}

// type="month" 月份选择器的配置数据
export interface IMonth extends IConfig, IDate {
  format: TMonthFormat // 日期格式
}

// type="week" 周选择器的配置数据
export interface IWeek extends IConfig, IDate {
  format: TWeekFormat // 日期格式
}

// type="day" 日期选择器的配置数据
export interface IDay extends IConfig, IDate {
  format: TDateFormat // 日期格式
}

// type="days" 日期多选器的配置数据
export interface IDays extends IDay {}

// type="dayrange" 日期范围选择器的配置数据
export interface IDayRange extends IDay {}

// type="time" 时间选择器的配置数据
export interface ITime extends IConfig, IDate {
  format: TTimeFormat // 时间格式
}

// type="timerange" 时间范围选择器的配置数据
export interface ITimeRange extends IConfig, ITime {
  format: TTimeFormat // 时间格式
}

// type="custom" 自定义类型的配置数据
export interface ICustom extends IConfig {
  
}