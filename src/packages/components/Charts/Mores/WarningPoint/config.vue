<template>
  <global-setting :optionData="optionData"></global-setting>
  <collapse-item name="预警点滴" expanded>
    <setting-item-box name="颜色"
      ><setting-item name="状态1颜色">
        <n-color-picker v-model:value="optionData.color[0]" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="状态2颜色">
        <n-color-picker v-model:value="optionData.color[1]" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="状态3颜色">
        <n-color-picker v-model:value="optionData.color[2]" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="状态4颜色">
        <n-color-picker v-model:value="optionData.color[3]" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="状态5颜色">
        <n-color-picker v-model:value="optionData.color[4]" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="描述颜色"
      ><setting-item name="描述1颜色">
        <n-color-picker v-model:value="optionData.textColor[0]" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="描述2颜色">
        <n-color-picker v-model:value="optionData.textColor[1]" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="描述3颜色">
        <n-color-picker v-model:value="optionData.textColor[2]" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="描述4颜色">
        <n-color-picker v-model:value="optionData.textColor[3]" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
      <setting-item name="描述5颜色">
        <n-color-picker v-model:value="optionData.textColor[4]" :modes="['hex']" size="small"></n-color-picker>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="图标"
      ><setting-item name="状态1图标">
        <n-select v-model:value="optionData.icon[0]" :options="iconList" size="small" />
      </setting-item>
      <setting-item name="状态2图标">
        <n-select v-model:value="optionData.icon[1]" :options="iconList" size="small" />
      </setting-item>
      <setting-item name="状态3图标">
        <n-select v-model:value="optionData.icon[2]" :options="iconList" size="small" />
      </setting-item>
      <setting-item name="状态4图标">
        <n-select v-model:value="optionData.icon[3]" :options="iconList" size="small" />
      </setting-item>
      <setting-item name="状态5图标">
        <n-select v-model:value="optionData.icon[4]" :options="iconList" size="small" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="内容">
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
import { option, iconList } from './config'

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
