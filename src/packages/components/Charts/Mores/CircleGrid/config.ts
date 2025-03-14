import { PublicConfigClass } from '@/packages/public'
import { CircleGridConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  dataset: dataJson,
  number: 40,
  width: 4,
  length: 24,
  radius: 100,
  frontColor: '#00EEFFFF',
  backColor: '#414C59FF',
  fontSize: 32,
  start: 0,
  end: 360,
  direction: 1,
  point: 2
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = CircleGridConfig.key
  public attr = { ...chartInitConfig, zIndex: -1 }
  public chartConfig = cloneDeep(CircleGridConfig)
  public option = cloneDeep(option)
}
