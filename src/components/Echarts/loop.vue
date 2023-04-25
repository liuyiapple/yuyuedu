<template>
  <div style="width: 130px; height: 110px" ref="charts"></div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  data: any
}>()
console.log(props.data)

import { onMounted, ref } from 'vue'
const charts = ref<HTMLElement | null>()
import * as echarts from 'echarts'
let dataPie2 = [{ value: 60 }, { value: 10 }]

let dataColor2 = ['#00CAFE', '#FEC20B', '#00CAFE']

let seriesData: any[] = [],
  total = 0
let startAngle: any[] = []

total = dataPie2.reduce((a, c) => a + c.value, 0)

dataPie2.reduce((a, c) => {
  startAngle.push((a / total) * 360)
  return a + c.value
}, 0)

for (let i = 0; i < dataPie2.length; i++) {
  seriesData.push({
    type: 'pie',
    clockWise: true,
    radius: [(30 + 8 * i) * 2.4 + '%', (30 + 8 * i + 4) * 2.4 + '%'],
    center: ['50%', '50%'],
    label: {
      normal: { show: false },
    },
    hoverAnimation: false,
    startAngle: 180 + startAngle[i],
    data: [
      {
        z: 1,
        value: total - dataPie2[i].value,
        tooltip: { show: false },
        itemStyle: { color: 'rgba(60, 79, 154, 0)', label: { show: false } },
      },
      {
        z: 2,
        value: dataPie2[i].value,
        itemStyle: {
          borderRadius: '30%',
          color: dataColor2[i],
          shadowBlur: 15,
          shadowColor: dataColor2[i],
        },
      },
    ],
  })
}

onMounted(() => {
  var option = {
    backgroundColor: '',
    width: '100%',
    height: '100%',
    grid: {
      bottom: 10,
      top: 10,
      right: 18,
      left: 10,
      containLabel: true,
      x: 10,
      y: 10,
      x2: 10,
      y2: 10,
    },
    tooltip: {
      trigger: 'item',
      show: false,
      formatter: '{b} : <br/>{d}%',
      backgroundColor: '',
      padding: [8, 10],
      extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);',
    },
    series: seriesData,
    label: {
      show: true,
    },
  }
  const myChart = echarts.init(charts.value!)
  myChart.setOption(option)
})
</script>
<style lang="less" scoped></style>
