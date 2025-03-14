import { PublicConfigClass } from '@/packages/public'
import { WarningPointConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const iconList = [
  { label: '实心点', value: '•' },
  { label: '对号', value: '√' },
  { label: '感叹号', value: '!' },
  { label: '叉号', value: '×' }
]

export const option = {
  dataset: dataJson,
  color: ['#67C23A', '#409EFF', '#909399', '#E6A23C', '#F56C6C'],
  icon: ['•', '√', '!', '×', '•'],
  textColor: ['#FFFFFFFF', '#FFFFFFFF', '#FFFFFFFF', '#FFFFFFFF', '#FFFFFFFF'],
  fontSize: 16,
  iconSize: 16,
  interval: 12
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = WarningPointConfig.key
  public attr = { ...chartInitConfig, zIndex: -1 }
  public chartConfig = cloneDeep(WarningPointConfig)
  public option = cloneDeep(option)
}
