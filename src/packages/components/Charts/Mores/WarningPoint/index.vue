<template>
  <div v-if="state.mergedConfig" class="go-dv-warning-point">
    <div class="warning-point-container">
      <div class="warning-point-item" v-for="item in state.mergedConfig.dataset">
        <div
          class="warning-point-status"
          :style="`--color:${state.mergedConfig.color[item.status - 1]};--iconSize:${
            state.mergedConfig.iconSize
          }px;margin-right:${state.mergedConfig.interval}px`"
        >
          <span>{{ state.mergedConfig.icon[item.status - 1] }}</span>
        </div>
        <div
          :style="`color:${state.mergedConfig.textColor[item.status - 1]};font-size:${state.mergedConfig.fontSize}px`"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, reactive, PropType } from 'vue'
import config, { option } from './config'
import { mergeTheme } from '@/packages/public/chart'

type DataProps = {
  status: string | number
  text: string | number
  [key: string]: string | number
}

interface StateProps {
  defaultConfig: {
    dataset: Array<DataProps>
  }
  mergedConfig: any
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
  } catch (error) {
    console.warn(error)
  }
}

onMounted(() => {
  calcData()
})
</script>

<style lang="scss" scoped>
@include go('dv-warning-point') {
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  cursor: default;
  user-select: none;
  align-items: center;
  justify-content: center;
  .warning-point-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    .warning-point-item {
      display: flex;
      justify-content: center;
      align-items: center;
      .warning-point-status {
        font-size: var(--iconSize);
        border-radius: 50%;
        border: 1px solid;
        width: var(--iconSize);
        height: var(--iconSize);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border-color: var(--color);
        span {
          color: var(--color);
        }
        &::before {
          position: absolute;
          content: '';
          width: calc(var(--iconSize) + 8px);
          height: calc(var(--iconSize) + 8px);
          border-radius: 50%;
          background: transparent;
          border: 2px solid;
          opacity: 0.8;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-color: var(--color);
        }
      }
    }
  }
}
</style>
