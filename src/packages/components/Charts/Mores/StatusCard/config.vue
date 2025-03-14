<template>
  <global-setting :optionData="optionData"></global-setting>
  <collapse-item name="状态卡片" expanded>
    <setting-item-box name="排列">
      <setting-item name="方向">
        <n-select
          v-model:value="optionData.direction"
          size="small"
          :options="[
            { label: '纵向', value: 'column' },
            { label: '横向', value: 'row' }
          ]"
        />
      </setting-item>
      <setting-item name="纵向间距" v-if="optionData.direction === 'column'">
        <n-input-number v-model:value="optionData.spaceY" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="横向间距" v-else>
        <n-input-number v-model:value="optionData.spaceX" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="内容">
      <setting-item name="溢出">
        <n-select v-model:value="optionData.overflow" size="small" :options="overflowOptions" />
      </setting-item>
      <setting-item name="滚动时长" v-show="optionData.overflow === 'scroll'">
        <n-input-number v-model:value="optionData.scrollTime" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="字体大小">
        <n-input-number v-model:value="optionData.fontSize" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="图标大小">
        <n-input-number v-model:value="optionData.iconSize" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item name="间距">
        <n-input-number v-model:value="optionData.interval" :min="0" :step="1" size="small"></n-input-number>
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

const overflowOptions = ref<any>([])

watch(
  () => props.optionData.direction,
  val => {
    if (val === 'column') {
      props.optionData.spaceX = 0
      overflowOptions.value = [
        { label: '省略号', value: 'ellipsis' },
        { label: '隐藏', value: 'hidden' }
      ]
      if (props.optionData.overflow === 'scroll' || props.optionData.overflow === 'wrap') {
        props.optionData.overflow = 'ellipsis'
      }
    } else {
      props.optionData.spaceY = 0
      overflowOptions.value = [
        { label: '省略号', value: 'ellipsis' },
        { label: '滚动', value: 'scroll' },
        { label: '隐藏', value: 'hidden' },
        { label: '换行', value: 'wrap' }
      ]
    }
  },
  { immediate: true }
)
</script>
