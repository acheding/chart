<template>
  <global-setting :optionData="optionData"></global-setting>
  <collapse-item name="圆形栅格占比" expanded>
    <setting-item-box name="栅格">
      <setting-item name="数量">
        <n-input-number v-model:value="optionData.number" :min="0" :max="1000" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="半径">
        <n-input-number v-model:value="optionData.radius" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="宽度">
        <n-input-number v-model:value="optionData.width" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="长度">
        <n-input-number v-model:value="optionData.length" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="前景色">
        <n-color-picker v-model:value="optionData.frontColor" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="背景色">
        <n-color-picker v-model:value="optionData.backColor" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="开始角度">
        <n-input-number v-model:value="optionData.start" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="结束角度">
        <n-input-number v-model:value="optionData.end" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="方向">
        <n-select
          v-model:value="optionData.direction"
          size="small"
          :options="[
            { label: '顺时针', value: 1 },
            { label: '逆时针', value: -1 }
          ]"
        />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="数值">
      <setting-item name="字体大小">
        <n-input-number v-model:value="optionData.fontSize" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="小数点">
        <n-input-number v-model:value="optionData.point" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, watch, ref } from 'vue'
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
