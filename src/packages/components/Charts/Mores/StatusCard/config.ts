import { PublicConfigClass } from '@/packages/public'
import { StatusCardConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  dataset: dataJson,
  direction: 'column',
  spaceX: 0,
  spaceY: 0,
  overflow: 'ellipsis',
  scrollTime: 5,
  fontSize: 16,
  iconSize: 6,
  interval: 8
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = StatusCardConfig.key
  public attr = { ...chartInitConfig, zIndex: -1 }
  public chartConfig = cloneDeep(StatusCardConfig)
  public option = cloneDeep(option)
}
