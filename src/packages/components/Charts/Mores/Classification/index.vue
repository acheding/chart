<template>
  <div v-if="state.mergedConfig" class="go-dv-classification">
    <div class="classification-container">
      <div
        class="classification-back"
        :style="`background:${state.mergedConfig.bar.backColor};
        height:${state.mergedConfig.bar.height}px;`"
      >
        <div
          class="classification-item"
          v-for="(item, index) in state.source"
          :style="`background:${themeColor.color[index]};
          justify-content:${state.mergedConfig.text.justifyContent};
          border-radius:${state.mergedConfig.bar.radius}px;
          width:${item.percent}%;`"
        >
          <div class="classification-content" :style="`top:${-state.mergedConfig.text.offsetY}px`">
            <span
              :style="`font-size:${state.mergedConfig.text.preSize}px;color:${
                state.mergedConfig.text.preFollow ? themeColor.color[index] : state.mergedConfig.text.preColor
              }`"
              >{{ item.name }}</span
            >
            <span
              :style="`color:${
                state.mergedConfig.text.suffFollow ? themeColor.color[index] : state.mergedConfig.text.suffColor
              };font-size:${state.mergedConfig.text.suffSize}px`"
              >{{ item.value.toFixed(state.mergedConfig.text.point) }}</span
            >
          </div>
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
  name: string | number
  value: string | number
  [key: string]: string | number
}

interface StateProps {
  defaultConfig: {
    dataset: Array<DataProps>
  }
  mergedConfig: any
  source: Array<any>
  first: Boolean
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
  source: [],
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
    const totalValue =
      dataset.map((x: any) => x.value).reduce((total: number, current: number) => total + current, 0) +
      state.mergedConfig.bar.interval * (dataset.length - 1)
    if (state.first) {
      state.first = false
      for (let i in dataset) {
        state.source.push({ ...dataset[i], ...{ percent: 0 } })
        setTimeout(() => {
          // @ts-ignore
          state.source[i].percent = (dataset[i].value / totalValue) * 100
        }, 0)
      }
    } else {
      state.source = dataset.map((x: any) => {
        return { name: x.name, value: x.value, percent: (x.value / totalValue) * 100 }
      })
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
@include go('dv-classification') {
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  cursor: default;
  user-select: none;
  align-items: center;
  .classification-container {
    width: 100%;
    padding: 60px;
    .classification-back {
      display: flex;
      justify-content: space-between;
      transition: all 1s;
      .classification-item {
        position: relative;
        transition: all 1s;
        display: flex;
        .classification-content {
          position: absolute;
          white-space: nowrap;
          span:first-child {
            margin-right: 4px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
