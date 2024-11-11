<template>
  <global-setting :optionData="optionData"></global-setting>
  <collapse-item name="栅格进度条" expanded>
    <setting-item-box name="进度条">
      <setting-item name="前景渐变前缀颜色">
        <n-color-picker v-model:value="optionData.bar.preColor" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="前景渐变后缀颜色">
        <n-color-picker v-model:value="optionData.bar.suffixColor" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="背景颜色">
        <n-color-picker v-model:value="optionData.bar.backColor" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="间隔">
        <n-input-number v-model:value="optionData.bar.interval" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="数量">
        <n-input-number
          v-model:value="optionData.bar.number"
          :min="1"
          :max="1000"
          :step="1"
          size="small"
        ></n-input-number>
      </setting-item>
      <setting-item name="高度">
        <n-input-number v-model:value="optionData.bar.height" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="圆角">
        <n-input-number v-model:value="optionData.bar.radius" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="数值">
      <setting-item name="类型">
        <n-select
          v-model:value="optionData.value.type"
          size="small"
          :options="[
            { label: '百分比值', value: 'percent' },
            { label: '真实值', value: 'actual' }
          ]"
        />
      </setting-item>
      <setting-item name="小数点">
        <n-input-number v-model:value="optionData.value.point" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker v-model:value="optionData.value.color" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="字号">
        <n-input-number v-model:value="optionData.value.fontSize" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="偏移">
        <n-input-number v-model:value="optionData.value.offsetY" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="边框颜色">
        <n-color-picker v-model:value="optionData.value.borderColor" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="标签">
      <setting-item name="是否显示">
        <n-checkbox v-model:checked="optionData.label.show" size="small">标签</n-checkbox>
      </setting-item>
      <template v-if="optionData.label.show">
        <setting-item name="颜色">
          <n-color-picker v-model:value="optionData.label.color" :modes="['hex']" size="small"></n-color-picker>
        </setting-item>
        <setting-item name="字号">
          <n-input-number v-model:value="optionData.label.fontSize" :min="0" :step="1" size="small"></n-input-number>
        </setting-item>
      </template>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option & GlobalThemeJsonType>,
    required: true
  }
})
</script>
