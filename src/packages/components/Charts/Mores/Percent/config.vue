<template>
  <global-setting :optionData="optionData"></global-setting>
  <collapse-item name="百分比条" expanded>
    <setting-item-box name="比值">
      <setting-item name="是否显示">
        <n-checkbox v-model:checked="optionData.value.show" size="small">比值</n-checkbox>
      </setting-item>
      <template v-if="optionData.value.show">
        <setting-item name="字号">
          <n-input-number v-model:value="optionData.value.fontSize" :min="0" :step="1" size="small"></n-input-number>
        </setting-item>
        <setting-item name="水平偏移">
          <n-input-number v-model:value="optionData.value.offsetX" :step="1" size="small"></n-input-number>
        </setting-item>
        <setting-item name="垂直偏移">
          <n-input-number v-model:value="optionData.value.offsetY" :step="1" size="small"></n-input-number>
        </setting-item>
        <setting-item name="颜色">
          <n-color-picker v-model:value="optionData.value.color" :modes="['hex']" size="small"></n-color-picker>
        </setting-item>
        <setting-item name="小数点">
          <n-input-number v-model:value="optionData.value.point" :min="0" :step="1" size="small"></n-input-number>
        </setting-item>
        <setting-item name="前缀文本">
          <n-input v-model:value="optionData.value.preContent" size="small"></n-input>
        </setting-item>
        <setting-item name="后缀文本">
          <n-input v-model:value="optionData.value.suffContent" size="small"></n-input>
        </setting-item>
        <setting-item name="前缀字号">
          <n-input-number v-model:value="optionData.value.preSize" :min="0" :step="1" size="small"></n-input-number>
        </setting-item>
        <setting-item name="后缀字号">
          <n-input-number v-model:value="optionData.value.suffSize" :min="0" :step="1" size="small"></n-input-number>
        </setting-item>
        <setting-item name="前缀颜色">
          <n-color-picker v-model:value="optionData.value.preColor" :modes="['hex']" size="small"></n-color-picker>
        </setting-item>
        <setting-item name="后缀颜色">
          <n-color-picker v-model:value="optionData.value.suffColor" :modes="['hex']" size="small"></n-color-picker>
        </setting-item>
      </template>
    </setting-item-box>
    <setting-item-box name="比例条">
      <setting-item name="高度">
        <n-input-number v-model:value="optionData.bar.height" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="圆角">
        <n-input-number v-model:value="optionData.bar.radius" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="前景颜色">
        <n-color-picker v-model:value="optionData.bar.frontColor" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="后景颜色">
        <n-color-picker v-model:value="optionData.bar.backColor" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="图标颜色">
        <n-color-picker v-model:value="optionData.bar.iconColor" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="刻度">
      <setting-item name="是否显示">
        <n-checkbox v-model:checked="optionData.tick.show" size="small">刻度线</n-checkbox>
      </setting-item>
      <template v-if="optionData.tick.show">
        <setting-item name="数量">
          <n-input-number
            v-model:value="optionData.tick.number"
            :min="2"
            :max="100"
            :step="1"
            size="small"
          ></n-input-number>
        </setting-item>
        <setting-item name="长度">
          <n-input-number v-model:value="optionData.tick.height" :step="1" size="small"></n-input-number>
        </setting-item>
        <setting-item name="粗细">
          <n-input-number v-model:value="optionData.tick.width" :step="1" size="small"></n-input-number>
        </setting-item>
        <setting-item name="颜色">
          <n-color-picker
            v-model:value="optionData.tick.color"
            :modes="['hex']"
            :actions="['clear']"
            size="small"
          ></n-color-picker>
        </setting-item>
      </template>
    </setting-item-box>
    <setting-item-box name="参考线">
      <setting-item name="是否显示">
        <n-checkbox v-model:checked="optionData.refer.show" size="small">参考线</n-checkbox>
      </setting-item>
      <template v-if="optionData.refer.show">
        <setting-item name="内容">
          <n-input v-model:value="optionData.refer.content" size="small"></n-input>
        </setting-item>
        <setting-item name="数值">
          <n-input-number v-model:value="optionData.refer.value" :min="0" :step="1" size="small"></n-input-number>
        </setting-item>
        <setting-item name="长度">
          <n-input-number v-model:value="optionData.refer.height" :step="1" size="small"></n-input-number>
        </setting-item>
        <setting-item name="粗细">
          <n-input-number v-model:value="optionData.refer.width" :step="1" size="small"></n-input-number>
        </setting-item>
        <setting-item name="颜色">
          <n-color-picker
            v-model:value="optionData.refer.color"
            :modes="['hex']"
            :actions="['clear']"
            size="small"
          ></n-color-picker>
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
