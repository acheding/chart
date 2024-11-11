<template>
  <div v-if="state.mergedConfig" class="go-dv-percent">
    <div class="percent-container">
      <div
        class="percent-back"
        :style="`--barHeight:${state.mergedConfig.bar.height}px;
        background:${state.mergedConfig.bar.backColor};
        border-radius:${state.mergedConfig.bar.radius}px`"
      >
        <div
          class="percent-front"
          :style="`width:${state.percent}%;
        background:linear-gradient(to right,${state.mergedConfig.bar.frontColor},#00EEFFFF);
        border-radius:${state.mergedConfig.bar.radius}px`"
        ></div>
        <div class="percent-value">
          <div class="percent-circle" :style="`--iconColor:${state.mergedConfig.bar.iconColor}`"></div>
          <div
            class="percent-text"
            v-if="state.mergedConfig.value.show"
            :style="`margin-top:${-state.mergedConfig.value.offsetY}px;
          margin-right:${-state.mergedConfig.value.offsetX}px`"
          >
            <span
              :style="`color:${state.mergedConfig.value.preColor};
          font-size:${state.mergedConfig.value.preSize}px`"
              >{{ state.mergedConfig.value.preContent }}</span
            >
            <span
              :style="`color:${state.mergedConfig.value.color};
          font-size:${state.mergedConfig.value.fontSize}px`"
              >{{ state.mergedConfig.dataset.value.toFixed(state.mergedConfig.value.point) }}</span
            >
            <span
              :style="`color:${state.mergedConfig.value.suffColor};
          font-size:${state.mergedConfig.value.suffSize}px`"
              >{{ state.mergedConfig.value.suffContent }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="percent-tick"
      v-if="state.mergedConfig.tick.show"
      :style="`--tickWidth:${state.mergedConfig.tick.width}px`"
    >
      <div
        class="percent-tick-line"
        v-for="i in state.mergedConfig.tick.number"
        :key="i"
        :style="`height:${state.mergedConfig.tick.height}px;
        --tickColor:${state.mergedConfig.tick.color}`"
      >
        <div class="percent-tick-number">
          {{
            state.mergedConfig.dataset.min + Math.round((state.dvalue / (state.mergedConfig.tick.number - 1)) * (i - 1))
          }}
        </div>
      </div>
    </div>

    <div
      class="percent-refer"
      v-if="state.mergedConfig.refer.show"
      :style="`--referWidth:${state.mergedConfig.refer.width}px;
         --referColor:${state.mergedConfig.refer.color}`"
    >
      <div
        class="percent-refer-line"
        :style="`height:${state.mergedConfig.refer.height}px;
        left:${state.mergedConfig.refer.value}%`"
      >
        <div class="percent-refer-text">
          {{ state.mergedConfig.refer.content }}
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
  percent: number
  dvalue: number
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
  percent: 0, // 百分比
  dvalue: 0, // 差值
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
    state.dvalue = dataset.max - dataset.min
    if (state.first) {
      state.first = false
      setTimeout(() => (state.percent = ((dataset.value - dataset.min) / (dataset.max - dataset.min)) * 100), 0)
    } else {
      state.percent = ((dataset.value - dataset.min) / (dataset.max - dataset.min)) * 100
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
@include go('dv-percent') {
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  cursor: default;
  user-select: none;
  align-items: center;
  .percent-container {
    width: 100%;
    padding: 60px;
    .percent-back {
      height: var(--barHeight);
      width: 100%;
      display: flex;
      .percent-front {
        transition: all 1s ease;
        height: 100%;
      }
      .percent-value {
        display: flex;
        justify-content: center;
        .percent-circle {
          &::before {
            position: absolute;
            content: '';
            width: var(--barHeight);
            height: var(--barHeight);
            border-radius: 50%;
            background: var(--iconColor);
            border: calc(var(--barHeight) * 1) solid #000;
            top: calc(50% - var(--barHeight) * 1.5);
            margin-left: calc(var(--barHeight) * -1.5);
            z-index: 2023;
          }
          &::after {
            position: absolute;
            content: '';
            width: calc(var(--barHeight) * 5);
            height: calc(var(--barHeight) * 5);
            background: transparent;
            border: calc(var(--barHeight) / 2) solid var(--iconColor);
            border-radius: 50%;
            top: calc(50% - var(--barHeight) * 2.5 - calc(var(--barHeight) / 2));
            margin-left: calc(var(--barHeight) * -2.5 - calc(var(--barHeight) / 2));
            // filter: blur(1px);
            opacity: 0.3;
            z-index: 2023;
          }
        }
        .percent-text {
          position: absolute;
          z-index: 2023;
          span {
            margin: 0 4px;
          }
        }
      }
    }
  }
  .percent-tick {
    width: calc(100% - 120px + var(--tickWidth));
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    .percent-tick-line {
      border-right: var(--tickWidth) dashed var(--tickColor);
      display: flex;
      justify-content: center;
      transition: all 1s ease;
      .percent-tick-number {
        position: absolute;
        margin-left: var(--tickWidth);
        bottom: -24px;
        color: #fff;
        transition: all 1s ease;
      }
    }
  }
  .percent-refer {
    width: calc(100% - 120px);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    .percent-refer-line {
      border-right: var(--referWidth) dashed var(--referColor);
      position: absolute;
      margin-left: calc(var(--referWidth) / -2);
      display: flex;
      justify-content: center;
      transition: all 1s ease;
    }
    .percent-refer-text {
      position: absolute;
      margin-left: var(--referWidth);
      bottom: -24px;
      color: var(--referColor);
      transition: all 1s ease;
      white-space: nowrap;
    }
  }
}
</style>
