<template>
  <global-setting :optionData="optionData"> </global-setting>
  <collapse-item name="等级占比图" expanded>
    <setting-item-box name="布局">
      <setting-item name="左侧距离">
        <n-input-number v-model:value="optionData.padding.left" :min="10" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="右侧距离">
        <n-input-number v-model:value="optionData.padding.right" :min="10" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="上侧距离">
        <n-input-number v-model:value="optionData.padding.top" :min="10" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="下侧距离">
        <n-input-number v-model:value="optionData.padding.bottom" :min="10" :step="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="排序" alone>
      <setting-item>
        <n-select
          v-model:value="optionData.sort"
          size="small"
          :options="[
            { label: '升序', value: 'ascending' },
            { label: '降序', value: 'descending' }
          ]"
        />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="名称">
      <setting-item name="是否显示">
        <n-checkbox v-model:checked="optionData.name.show" size="small">名称</n-checkbox>
      </setting-item>
      <setting-item name="字号" v-show="optionData.name.show">
        <n-input-number v-model:value="optionData.name.fontSize" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="颜色" v-show="optionData.name.show">
        <n-color-picker v-model:value="optionData.name.color" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="数值">
      <setting-item name="是否显示">
        <n-checkbox v-model:checked="optionData.value.show" size="small">数值</n-checkbox>
      </setting-item>
      <setting-item name="字号" v-show="optionData.value.show">
        <n-input-number v-model:value="optionData.value.fontSize" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="颜色" v-show="optionData.value.show">
        <n-color-picker v-model:value="optionData.value.color" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="单位" v-show="optionData.value.show">
        <n-input v-model:value="optionData.value.unit" size="small"></n-input>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="比例条">
      <setting-item name="高度">
        <n-input-number
          v-model:value="optionData.item.height"
          :min="0"
          :max="100 / optionData.dataset.source.length"
          :step="1"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item name="最大宽度">
        <n-input-number
          v-model:value="optionData.item.maxWidth"
          :min="1"
          :max="total / Math.max(...values)"
          :step="0.01"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item name="圆角">
        <n-input-number v-model:value="optionData.item.radius" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="渐变色">
        <n-color-picker
          v-model:value="optionData.item.gradientColor"
          :actions="['clear']"
          :modes="['hex']"
          size="small"
        ></n-color-picker>
      </setting-item>
      <setting-item name="是否显示">
        <n-checkbox v-model:checked="optionData.item.showPercent" size="small">百分比</n-checkbox>
      </setting-item>
      <setting-item name="百分比字号" v-show="optionData.item.showPercent">
        <n-input-number v-model:value="optionData.item.fontSize" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="百分比颜色" v-show="optionData.item.showPercent">
        <n-color-picker v-model:value="optionData.item.percentColor" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="小数点" v-show="optionData.item.showPercent">
        <n-input-number v-model:value="optionData.item.point" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="连接线">
      <setting-item name="颜色">
        <n-color-picker v-model:value="optionData.line.color" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="宽度">
        <n-input-number v-model:value="optionData.line.width" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="两侧间距">
        <n-input-number v-model:value="optionData.item.spacing" :min="0" :step="10" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, watch, computed } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option & GlobalThemeJsonType>,
    required: true
  }
})

const values = computed(() => {
  return props.optionData.dataset.source.map((x: any) => x[props.optionData.dataset.dimensions[1]])
})

const total = computed(() => {
  return values.value.reduce((total: number, currentValue: number) => total + currentValue, 0)
})

watch(
  () => props.optionData.sort,
  (newVal: any) => {
    switch (newVal) {
      case 'ascending':
        props.optionData.dataset.source.sort(
          (a: any, b: any) => a[props.optionData.dataset.dimensions[1]] - b[props.optionData.dataset.dimensions[1]]
        )
        break
      case 'descending':
        props.optionData.dataset.source.sort(
          (a: any, b: any) => b[props.optionData.dataset.dimensions[1]] - a[props.optionData.dataset.dimensions[1]]
        )
        break
      default:
        break
    }
  }
)
</script>
