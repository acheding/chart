import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const CircleGridConfig: ConfigType = {
  key: 'CircleGrid',
  chartKey: 'VCircleGrid',
  conKey: 'VCCircleGrid',
  title: '圆形栅格占比',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'circle-grid.png'
}
