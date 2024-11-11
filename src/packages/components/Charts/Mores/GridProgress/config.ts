import { PublicConfigClass } from '@/packages/public'
import { GridProgressConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  dataset: dataJson,
  bar: {
    interval: 2,
    height: 20,
    radius: 4,
    backColor: '#AAAAAAFF',
    preColor: '#6AE5BBFF',
    suffixColor: '#3C7DDFFF',
    number: 10
  },
  value: {
    type: 'percent',
    point: 1,
    fontSize: 14,
    color: '#FFFFFFFF',
    borderColor: '#00EEFFFF',
    offsetY: 38
  },
  label: {
    show: false,
    fontSize: 14,
    color: '#FFFFFFFF'
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = GridProgressConfig.key
  public attr = { ...chartInitConfig, zIndex: -1 }
  public chartConfig = cloneDeep(GridProgressConfig)
  public option = cloneDeep(option)
}
