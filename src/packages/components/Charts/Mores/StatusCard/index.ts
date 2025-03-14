import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const StatusCardConfig: ConfigType = {
  key: 'StatusCard',
  chartKey: 'VStatusCard',
  conKey: 'VCStatusCard',
  title: '状态卡片',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'status-card.png'
}
