<template>
  <global-setting :optionData="optionData"></global-setting>
  <collapse-item name="分类占比条" expanded>
    <setting-item-box name="比例条">
      <setting-item name="背景色">
        <n-color-picker
          v-model:value="optionData.bar.backColor"
          :actions="['clear']"
          :modes="['hex']"
          size="small"
        ></n-color-picker>
      </setting-item>
      <setting-item name="间隔">
        <n-input-number v-model:value="optionData.bar.interval" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="高度">
        <n-input-number v-model:value="optionData.bar.height" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="圆角">
        <n-input-number v-model:value="optionData.bar.radius" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="文本">
      <setting-item name="对齐方式">
        <n-select
          v-model:value="optionData.text.justifyContent"
          size="small"
          :options="[
            { label: '居中', value: 'center' },
            { label: '居左', value: 'flex-start' },
            { label: '居右', value: 'flex-end' }
          ]"
        />
      </setting-item>
      <setting-item name="偏移">
        <n-input-number v-model:value="optionData.text.offsetY" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="前缀字号">
        <n-input-number v-model:value="optionData.text.preSize" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="后缀字号">
        <n-input-number v-model:value="optionData.text.suffSize" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="小数点">
        <n-input-number v-model:value="optionData.text.point" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="前缀颜色">
        <n-select
          v-model:value="optionData.text.preFollow"
          size="small"
          :options="[
            { label: '跟随', value: true },
            { label: '不跟随', value: false }
          ]"
        />
      </setting-item>
      <setting-item name="前缀颜色" v-if="!optionData.text.preFollow">
        <n-color-picker v-model:value="optionData.text.preColor" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="后缀颜色">
        <n-select
          v-model:value="optionData.text.suffFollow"
          size="small"
          :options="[
            { label: '跟随', value: true },
            { label: '不跟随', value: false }
          ]"
        />
      </setting-item>
      <setting-item name="前缀颜色" v-if="!optionData.text.suffFollow">
        <n-color-picker v-model:value="optionData.text.suffColor" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
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
