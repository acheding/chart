import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const WarningPointConfig: ConfigType = {
  key: 'WarningPoint',
  chartKey: 'VWarningPoint',
  conKey: 'VCWarningPoint',
  title: '预警点滴',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'warning-point.png'
}
