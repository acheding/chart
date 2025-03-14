<template>
  <div v-if="state.mergedConfig" class="go-dv-status-card">
    <div
      class="status-card-container"
      :style="`flex-direction:${state.mergedConfig.direction};
        flex-wrap:${state.mergedConfig.overflow === 'wrap' ? 'wrap' : ''};
        --time:${state.mergedConfig.overflow === 'scroll' ? state.mergedConfig.scrollTime : 0}s;
        overflow:${state.mergedConfig.overflow === 'scroll' ? 'visible' : 'hidden'};`"
    >
      <div
        class="status-card-item"
        v-for="item in state.mergedConfig.dataset"
        :style="`--marginRight:${state.mergedConfig.spaceX}px;--marginBottom:${state.mergedConfig.spaceY}px;
        text-overflow:${state.mergedConfig.overflow === 'ellipsis' ? 'ellipsis' : ''};
        overflow:${state.mergedConfig.overflow === 'scroll' ? 'visible' : 'hidden'};
        font-size:${state.mergedConfig.fontSize}px`"
      >
        <div
          class="icon"
          :style="`--iconColor:${colors[item.status]};--iconSize:${state.mergedConfig.iconSize}px;margin:0 ${
            state.mergedConfig.interval
          }px`"
        ></div>
        <span class="text">{{ item.name }}</span>
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
  status: string | number
  [key: string]: string | number
}

type ColorType = {
  [key: string]: string | number
  success: string
  primary: string
  info: string
  warning: string
  danger: string
}
interface StateProps {
  defaultConfig: {
    dataset: Array<DataProps>
    direction: any
    spaceX: any
    spaceY: any
    overflow: any
    scrollTime: any
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

const colors: ColorType = {
  success: '#67C23A',
  primary: '#409EFF',
  info: '#909399',
  warning: '#E6A23C',
  danger: '#F56C6C'
}
</script>

<style lang="scss" scoped>
@include go('dv-status-card') {
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  cursor: default;
  user-select: none;
  align-items: center;
  justify-content: center;
  .status-card-container {
    display: flex;
    animation: scroll var(--time) linear infinite;
    @keyframes scroll {
      0% {
        transform: translateX(40%);
      }
      100% {
        transform: translateX(-40%);
      }
    }
    .status-card-item {
      margin-right: var(--marginRight);
      margin-bottom: var(--marginBottom);
      white-space: nowrap;
      &:last-child {
        margin-right: 0;
        margin-bottom: 0;
      }
      .icon {
        width: var(--iconSize);
        height: var(--iconSize);
        background: var(--iconColor);
        display: inline-block;
        vertical-align: middle;
        border-radius: 50%;
        position: relative;
        &::before,
        &::after {
          position: absolute;
          content: '';
          background: var(--iconColor);
          width: var(--iconSize);
          height: var(--iconSize);
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        &::before {
          border: 2px solid var(--iconColor);
          opacity: 0.5;
        }
        &::after {
          opacity: 0.3;
          border: 4px solid var(--iconColor);
        }
      }
      .text {
        vertical-align: middle;
        color: #fff;
      }
    }
  }
}
</style>
