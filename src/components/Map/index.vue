<template>
  <div
    class="map"
    id="mapEchart"
    style="width: 100%; height: 95vh"
    ref="myChart"
  ></div>
</template>

<script setup lang="ts">
import geoJson from '@/map/shangyu.json'
import * as echarts from 'echarts'
import 'echarts-gl'
import 'echarts/theme/macarons.js'
import { onMounted, ref } from 'vue'
const myChart = ref<HTMLElement | null>()
onMounted(() => {
  const myChart = echarts.init(
    document.getElementById('mapEchart') as HTMLElement
  )

  echarts.registerMap('shangyuqu', geoJson)

  const option = {
    tooltip: {
      show: true,
    },
    geo3D: {
      map: 'shangyuqu',
      roam: false,
      itemStyle: {
        color: '#007aff',
        opacity: 0.8,
        borderWidth: 0.4,
        borderColor: '#000',
      },
      viewControl: {
        autoRotate: false,
        autoRotateAfterStill: 3,
        distance: 210,
        minAlpha: 5,
        maxAlpha: 100,
        minBeta: 0,
        maxBeta: 11000,
        animation: true,
      },
      emphasis: {
        disabled: true,
        label: {
          show: true,
          color: '#333',
          fontSize: 18,
        },
        itemStyle: {
          color: '#fff',
        },
      },
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        fontSize: 14,
        lineHeight: 16,
      },
      shading: 'lambert',
      light: {
        main: {
          intensity: 1,
          shadow: true,
          shadowQuality: 'medium',
          alpha: 55,
          beta: 10,
        },
        ambient: {
          intensity: 0.7,
        },
      },
    },
    series: [
      {
        selectedMode: true,
      },
    ],
  }
  //  5.6.0 echarts 3D地图 添加点击事件 获取点击的地区
  myChart.getZr().on('click', function (params) {
    console.log(params)
  })
  myChart.setOption(option)
  console.log(myChart, 'myChartmyChartmyChartmyChart')
  // 绑定点击事件
})
</script>

<style lang="less" scoped>
.map {
  z-index: 0;
}
</style>
