<template>
  <div v-if="state.mergedConfig" class="go-dv-circle-grid">
    <div class="circle-grid-container">
      <div class="circle-grid-circle">
        <span
          class="circle-grid-span"
          v-for="item in state.mergedConfig.number"
          :style="`--i:${item - 1};--angle:${state.angle}deg;--radius:${state.mergedConfig.radius}px;
          height:${state.mergedConfig.width}px;width:${state.mergedConfig.length}px;
          background:${
            item <= Math.floor(state.proportion) + 1 ? state.mergedConfig.frontColor : state.mergedConfig.backColor
          };z-index:${state.mergedConfig.number - item};
          --start:${state.mergedConfig.start}deg;
          --direction:${state.mergedConfig.direction}`"
        ></span>
        <div style="color: #fff">
          <span :style="`font-size:${state.mergedConfig.fontSize}px`">{{
            state.value.count.toFixed(state.mergedConfig.point)
          }}</span
          ><span
            :style="`font-size:${
              state.mergedConfig.fontSize - 10 > 0 ? state.mergedConfig.fontSize - 10 : state.mergedConfig.fontSize
            }px`"
            >%</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, reactive, PropType } from 'vue'
import config, { option } from './config'
import { mergeTheme } from '@/packages/public/chart'
import gsap from 'gsap'

type DataProps = {
  value: string | number
  max: string | number
  min: string | number
  [key: string]: string | number
}

interface StateProps {
  defaultConfig: {
    dataset: {}
  }
  mergedConfig: any
  first: boolean
  angle: number
  proportion: number
  value: any
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
  first: true,
  angle: 0,
  proportion: 0,
  value: {
    count: 0
  }
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
    const dvalue = state.mergedConfig.end - state.mergedConfig.start
    if (dvalue < 360) {
      state.angle = dvalue / (state.mergedConfig.number - 1)
    } else {
      state.angle = dvalue / state.mergedConfig.number
    }
    gsap.to(state.value, {
      duration: 1,
      count: Number(state.mergedConfig.dataset.value * 100) || 0
    })
    if (state.first) {
      state.first = false
      setTimeout(() => (state.proportion = state.mergedConfig.dataset.value * state.mergedConfig.number), 0)
    } else {
      state.proportion = state.mergedConfig.dataset.value * state.mergedConfig.number
    }
  } catch (error) {
    console.warn(error)
  }
}

onMounted(() => {
  calcData()
})
</script>

<style lang="scss" scoped>
@include go('dv-circle-grid') {
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  cursor: default;
  user-select: none;
  align-items: center;
  justify-content: center;
  .circle-grid-container {
    display: flex;
    .circle-grid-circle {
      display: flex;
      justify-content: center;
      align-items: center;
      .circle-grid-span {
        position: absolute;
        background: #fff;
        transform: rotate(calc(var(--start) + var(--direction) * var(--i) * var(--angle)))
          translateX(calc(-1 * var(--radius)));
        transition: 1s ease-out;
      }
    }
  }
}
</style>
