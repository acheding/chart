import { PublicConfigClass } from '@/packages/public'
import { ClassificationConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  dataset: dataJson,
  bar: {
    interval: 5,
    backColor: 'transparent',
    height: 20,
    radius: 0
  },
  text: {
    justifyContent: 'center',
    offsetY: 24,
    point: 0,
    preSize: 14,
    suffSize: 14,
    preColor: '#FFFFFFFF',
    suffColor: '#FFFFFFFF',
    preFollow: false,
    suffFollow: true
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = ClassificationConfig.key
  public attr = { ...chartInitConfig, zIndex: -1 }
  public chartConfig = cloneDeep(ClassificationConfig)
  public option = cloneDeep(option)
}
