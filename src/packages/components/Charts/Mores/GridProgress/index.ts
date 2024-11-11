import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const GridProgressConfig: ConfigType = {
  key: 'GridProgress',
  chartKey: 'VGridProgress',
  conKey: 'VCGridProgress',
  title: '栅格进度条',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'grid-percent.png'
}
