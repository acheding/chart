import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const GradeConfig: ConfigType = {
  key: 'Grade',
  chartKey: 'VGrade',
  conKey: 'VCGrade',
  title: '等级占比图',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'grade.png'
}
