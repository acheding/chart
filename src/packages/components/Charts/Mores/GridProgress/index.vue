<template>
  <div v-if="state.mergedConfig" class="go-dv-grid-progress">
    <div class="grid-progress-container">
      <div
        class="grid-progress-bar"
        v-for="i in state.mergedConfig.bar.number"
        :style="`--barRadius:${state.mergedConfig.bar.radius}px;
        --barHeight:${state.mergedConfig.bar.height}px;
        --barWidth:${perGridWidth}%;
        --barBackground:${renderBack(i)};
        background:linear-gradient(to right,${state.mergedConfig.bar.preColor},${state.mergedConfig.bar.suffixColor}) ${
          (i - 1) * perGridWidth
        }% / ${state.mergedConfig.bar.number * 100 + '%'} no-repeat;`"
      ></div>
    </div>
    <div class="grid-progress-tick" :style="`--barHeight:${state.mergedConfig.bar.height}px`">
      <div
        class="grid-progress-mark"
        v-for="j in ['0', '100']"
        v-if="state.mergedConfig.label.show"
        :style="`left:${j}%`"
      >
        <div :style="`color:${state.mergedConfig.label.color};font-size:${state.mergedConfig.label.fontSize}px`">
          {{ getMark(j) }}
        </div>
      </div>
      <div class="grid-progress-value" :style="`left:${textLeft}%`">
        <div
          class="grid-progress-text"
          :style="`color:${state.mergedConfig.value.color};font-size:${state.mergedConfig.value.fontSize}px;
          --offsetY:${state.mergedConfig.value.offsetY}px;
          --borderColor:${state.mergedConfig.value.borderColor}`"
        >
          {{ textValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, reactive, PropType, computed, nextTick } from 'vue'
import config, { option } from './config'
import { mergeTheme } from '@/packages/public/chart'

interface StateProps {
  defaultConfig: {
    dataset: {}
  }
  mergedConfig: any
  valuePercent: number
  perGridPercent: number
  renderGridNum: number
  remainingGridPercent: number
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
  valuePercent: 0,
  perGridPercent: 0,
  renderGridNum: 0,
  remainingGridPercent: 0,
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
    if (!dataset) return
    if (state.first) {
      setTimeout(() => initData(), 0)
      state.first = false
    } else {
      initData()
    }
  } catch (error) {
    console.warn(error)
  }
}

onMounted(() => {
  calcData()
})

const initData = () => {
  // 当前值所占比例(100%)
  state.valuePercent =
    ((state.mergedConfig.dataset.value - state.mergedConfig.dataset.min) /
      (state.mergedConfig.dataset.max - state.mergedConfig.dataset.min)) *
    100
  // 每一个栅格比例(100%)
  state.perGridPercent = 100 / state.mergedConfig.bar.number
  // 完整渲染的栅格个数
  state.renderGridNum = Math.floor(state.valuePercent / state.perGridPercent)
  // 不完整渲染的栅格剩余比例(1)
  state.remainingGridPercent = (state.valuePercent - state.renderGridNum * state.perGridPercent) / state.perGridPercent
}

const perGridWidth = computed(() => {
  return (100 - state.mergedConfig.bar.interval * (state.mergedConfig.bar.number - 1)) / state.mergedConfig.bar.number
})

const textValue = computed(() => {
  switch (state.mergedConfig.value.type) {
    case 'percent':
      return (
        (
          (state.mergedConfig.dataset.value / (state.mergedConfig.dataset.max - state.mergedConfig.dataset.min)) *
          100
        ).toFixed(state.mergedConfig.value.point) + '%'
      )
    case 'actual':
      return state.mergedConfig.dataset.value.toFixed(state.mergedConfig.value.point)
  }
})

const textLeft = computed(() => {
  // 实际left占比
  const textLeft =
    (state.renderGridNum + state.remainingGridPercent) * perGridWidth.value +
    state.renderGridNum * state.mergedConfig.bar.interval

  if (state.valuePercent === 100) return textLeft - state.mergedConfig.bar.interval
  else if (state.remainingGridPercent === 0 && state.renderGridNum !== 0)
    return textLeft - state.mergedConfig.bar.interval / 2
  else return textLeft
})

const renderBack = (i: number) => {
  if (state.remainingGridPercent === 0) {
    if (i <= state.renderGridNum) return 'transparent'
    else return `${state.mergedConfig.bar.backColor}`
  } else {
    if (i <= state.renderGridNum) {
      return 'transparent'
    } else if (i === state.renderGridNum + 1) {
      return `linear-gradient(to right,transparent ${state.remainingGridPercent * 100}%,${
        state.mergedConfig.bar.backColor
      } ${state.remainingGridPercent * 100}%)`
    } else {
      return `${state.mergedConfig.bar.backColor}`
    }
  }
}

const getMark = (position: any) => {
  switch (state.mergedConfig.value.type) {
    case 'percent':
      return position + '%'
    case 'actual':
      switch (position) {
        case '0':
          return state.mergedConfig.dataset.min
        case '100':
          return state.mergedConfig.dataset.max
      }
  }
}
</script>

<style lang="scss" scoped>
@include go('dv-grid-progress') {
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  cursor: default;
  user-select: none;
  align-items: center;
  .grid-progress-container {
    width: 100%;
    padding: 60px;
    display: flex;
    justify-content: space-between;
    .grid-progress-bar {
      height: var(--barHeight);
      width: var(--barWidth);
      border-radius: var(--barRadius);
      transition: all 1s;
      position: relative;
      &::before {
        position: absolute;
        content: '';
        height: 100%;
        width: 100%;
        background: var(--barBackground);
        border-radius: var(--barRadius);
        transition: all 1s;
      }
    }
  }
  .grid-progress-tick {
    width: calc(100% - 120px);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .grid-progress-mark {
      position: absolute;
      top: calc(var(--barHeight) * 0.5);
      display: flex;
      justify-content: center;
      width: 0;
    }
    .grid-progress-value {
      position: absolute;
      display: flex;
      justify-content: center;
      transition: all 1s;
      .grid-progress-text {
        position: absolute;
        top: calc(var(--barHeight) * -0.5 - var(--offsetY));
        padding: 0px 4px;
        border: 1px solid var(--borderColor);
        border-radius: 1px;
        box-shadow: 0 0 2px var(--borderColor);
        box-sizing: border-box;
        transition: top 1s;
        &::after {
          position: absolute;
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          filter: blur(1px);
          background: var(--borderColor);
          left: calc(50% - 2px);
          bottom: -10px;
        }
      }
    }
  }
}
</style>
