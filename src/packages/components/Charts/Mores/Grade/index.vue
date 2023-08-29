<template>
  <div
    v-if="state.mergedConfig"
    class="go-dv-grade-chart"
    :style="{
      paddingLeft: numberSizeHandle(state.mergedConfig.padding.left),
      paddingRight: numberSizeHandle(state.mergedConfig.padding.right),
      paddingTop: numberSizeHandle(state.mergedConfig.padding.top),
      paddingBottom: numberSizeHandle(state.mergedConfig.padding.bottom)
    }"
  >
    <div class="label-column" v-show="state.mergedConfig.name.show">
      <div
        v-for="item in state.mergedConfig.dataset.source"
        :key="item[state.mergedConfig.dataset.dimensions[0]]"
        :style="{
          height: state.gradeItemHeight,
          fontSize: numberSizeHandle(state.mergedConfig.name.fontSize),
          color: state.mergedConfig.name.color
        }"
      >
        {{ item[state.mergedConfig.dataset.dimensions[0]] }}
      </div>
    </div>

    <div class="grade-container">
      <div
        v-for="(grade, index) in state.gradeLength"
        :key="index"
        class="grade-item"
        :style="`height: ${state.gradeItemHeight};
          --lineWidth: calc(${(1 - grade * state.mergedConfig.item.maxWidth) * 50}% - ${
          state.mergedConfig.item.spacing * 2
        }px);
        --lineSpacing: ${state.mergedConfig.item.spacing | 0}px;
          --lineHeight: ${state.mergedConfig.line.width}px;
          --lineColor: ${state.mergedConfig.line.color}`"
      >
        <div
          class="grade-item-column"
          :style="`width: ${grade * state.mergedConfig.item.maxWidth * 100}%;
          background: linear-gradient(to top, ${themeColor.color[index % themeColor.color.length]},
          ${
            state.mergedConfig.item.gradientColor
              ? state.mergedConfig.item.gradientColor
              : themeColor.color[index % themeColor.color.length]
          }); 
          border-radius: ${state.mergedConfig.item.radius}px;`"
        >
          <span
            v-if="state.mergedConfig.item.showPercent"
            :style="`color:${state.mergedConfig.item.percentColor}; 
          font-size: ${numberSizeHandle(state.mergedConfig.item.fontSize)}`"
          >
            {{ (grade * 100).toFixed(state.mergedConfig.item.point) }}%
          </span>
          <span v-else>&nbsp;</span>
        </div>
      </div>
    </div>

    <div class="value-column" v-show="state.mergedConfig.value.show">
      <div
        v-for="(value, index) in state.gradeValue"
        :key="index"
        :style="{
          height: state.gradeItemHeight,
          fontSize: numberSizeHandle(state.mergedConfig.value.fontSize),
          color: state.mergedConfig.value.color
        }"
      >
        {{ value }}
        <span v-show="state.mergedConfig.value.unit">{{ state.mergedConfig.value.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, reactive, PropType } from 'vue'
import config, { option } from './config'
import { mergeTheme } from '@/packages/public/chart'

type DataProps = {
  name: string | number
  value: string | number
  [key: string]: string | number
}

interface StateProps {
  defaultConfig: {
    dataset: {
      dimensions: Array<string>
      source: Array<DataProps>
    }
    padding: {
      top: number
      bottom: number
      left: number
      right: number
    }
    name: {
      show: boolean
      fontSize: number
      color: string
    }
    value: {
      show: boolean
      fontSize: number
      color: string
      unit: string
    }
    item: {
      height: number
      radius: number
      fontSize: number
      showPercent: boolean
      percentColor: string
      gradientColor: string
      spacing: number
      point: number
    }
    line: {
      color: string
      width: number
    }
  }
  mergedConfig: any
  gradeLength: Array<number>
  gradeValue: Array<string | Object>
  labelData: Array<number>
  gradeItemHeight: string
  first: boolean
}

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<config>,
    default: () => ({})
  }
})

const state = reactive<StateProps>({
  defaultConfig: option,
  mergedConfig: null,
  gradeLength: [],
  gradeValue: [],
  labelData: [],
  gradeItemHeight: '',
  first: true
})

watch(
  () => props.chartConfig.option,
  () => {
    calcData()
  },
  {
    deep: true
  }
)

const calcData = () => {
  state.mergedConfig = mergeTheme(props.chartConfig.option, props.themeSetting, [])
  calcGradeLengthAndLabelData(state.mergedConfig.dataset)
}

// 数据解析
const calcGradeLengthAndLabelData = (dataset: any) => {
  try {
    const { source } = dataset
    if (!source || !source.length) return

    state.gradeItemHeight = state.mergedConfig.item.height + '%'
    const gradeValue = source.map((item: DataProps) => item[state.mergedConfig.dataset.dimensions[1]])

    const totalValue = gradeValue.reduce((total: number, currentValue: number) => total + currentValue, 0)

    state.gradeValue = gradeValue

    if (state.first) {
      state.first = false
      state.gradeLength = Array(gradeValue.length).fill(0)
      setTimeout(() => (state.gradeLength = gradeValue.map((v: any) => (totalValue ? v / totalValue : 0))), 0)
    } else {
      state.gradeLength = gradeValue.map((v: any) => (totalValue ? v / totalValue : 0))
    }
  } catch (error) {
    console.warn(error)
  }
}

const numberSizeHandle = (val: string | number) => {
  return val + 'px'
}

onMounted(() => {
  calcData()
})
</script>

<style lang="scss" scoped>
@include go('dv-grade-chart') {
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  cursor: default;
  user-select: none;

  .label-column,
  .value-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    text-align: right;
    margin: 5px 0;
    div {
      display: flex;
      align-items: center;
    }
  }

  .grade-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .grade-item {
    margin: 5px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &::before,
    &::after {
      position: absolute;
      content: '';
      background: var(--lineColor);
      width: var(--lineWidth);
      height: var(--lineHeight);
      border-radius: var(--lineHeight);
      transition: all 1s ease;
    }
    &::before {
      left: var(--lineSpacing);
    }
    &::after {
      right: var(--lineSpacing);
    }

    .grade-item-column {
      height: 100%;
      transition: width 1s ease;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
