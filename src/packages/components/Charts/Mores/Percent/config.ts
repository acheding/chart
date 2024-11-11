import { PublicConfigClass } from '@/packages/public'
import { PercentConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  dataset: dataJson,
  value: {
    show: true,
    fontSize: 24,
    offsetX: 0,
    offsetY: 60,
    color: '#00EEEEFF',
    point: 0,
    preContent: '已到',
    preSize: 16,
    preColor: '#FFFFFFFF',
    suffContent: '人',
    suffSize: 16,
    suffColor: '#FFFFFFFF'
  },
  bar: {
    radius: 0,
    height: 10,
    frontColor: '#006FFFFF',
    backColor: '#AAAAAAAB',
    iconColor: '#00EEFFFF'
  },
  tick: {
    show: true,
    number: 6,
    height: 60,
    width: 2,
    color: '#88888888'
  },
  refer: {
    show: false,
    color: '#FF0000BA',
    height: 120,
    width: 2,
    value: 90,
    content: '参考线'
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = PercentConfig.key
  public attr = { ...chartInitConfig, zIndex: -1 }
  public chartConfig = cloneDeep(PercentConfig)
  public option = cloneDeep(option)
}
