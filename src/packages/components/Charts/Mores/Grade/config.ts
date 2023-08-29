import { PublicConfigClass } from '@/packages/public'
import { GradeConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  dataset: dataJson,
  padding: {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
  },
  sort: null, // 排序
  name: {
    show: true,
    fontSize: 16,
    color: '#B9B8CCFF'
  },
  value: {
    show: true,
    fontSize: 16,
    color: '#B9B8CCFF',
    unit: '' // 单位
  },
  item: {
    height: 6, // 比例条高度
    maxWidth: 1, // 最大宽度
    radius: 0, // 圆角
    fontSize: 16,
    showPercent: true, // 显示百分比
    percentColor: '#FFFFFFFF', // 百分比颜色
    gradientColor: '', // 渐变色
    spacing: 10, // 两侧间距
    point: 1 // 小数点后几位
  },
  line: {
    color: '#B9B8CCFF', // 连接线颜色
    width: 1 // 连接线宽度
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = GradeConfig.key
  public attr = { ...chartInitConfig, zIndex: -1 }
  public chartConfig = cloneDeep(GradeConfig)
  public option = cloneDeep(option)
}
