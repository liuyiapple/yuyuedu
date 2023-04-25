<template>
  <div class="charts" style="width: 400px; height: 250px" ref="charts"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
const charts = ref<HTMLElement | null>(null)
let series: any[] = []
let pieDatas = [
  {
    value: 75,
    name: '人文类阅读情况',
  },
  {
    value: 50,
    name: '科学类阅读情况',
  },
  {
    value: 3,
    name: '历史类阅读情况',
  },
  {
    value: 50,
    name: '艺术类阅读情况',
  },
]
let maxRadius = 50,
  barWidth = 4,
  barGap = 5
let barColor = ['#204DCD', '#4D9770', '#2FABC5', '#DCA255']
pieDatas.map((item, i) => {
  series.push({
    type: 'pie',
    clockWise: false, //顺时加载
    hoverAnimation: false, //鼠标移入变大
    radius: [
      maxRadius - i * (barGap + barWidth) + '%',
      maxRadius - (i + 1) * barWidth - i * barGap + '%',
    ],
    center: ['20%', '50%'],
    label: {
      show: false,
    },
    itemStyle: {
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      borderWidth: 5,
    },
    data: [
      {
        value: item.value,
        name: item.name + '       ' + item.value + '页   ' + item.value + '%',
        itemStyle: {
          color: barColor[i],
        },
      },
      {
        value: 100 - item.value,
        name: '',
        itemStyle: {
          color: 'transparent',
        },
        tooltip: {
          show: false,
        },
        hoverAnimation: false,
      },
    ],
  })
  series.push({
    name: '',
    type: 'pie',
    silent: true,
    z: 0,
    clockWise: false, //顺时加载
    hoverAnimation: false, //鼠标移入变大
    radius: [
      maxRadius - i * (barGap + barWidth) + '%',
      maxRadius - (i + 1) * barWidth - i * barGap + '%',
    ],
    center: ['10%', '50%'],

    label: {
      show: false,
    },
    itemStyle: {
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
    },
    data: [
      {
        value: 1,
        itemStyle: {
          color: 'transparent',
        },
        tooltip: {
          show: false,
        },
        hoverAnimation: false,
      },
    ],
  })
})
onMounted(() => {
  const option = {
    grid: {
      bottom: 0,
      top: 0,
      right: 8,
      containLabel: true,
    },
    backgroundColor: '',
    tooltip: {
      show: false,
    },
    xAxis: [
      {
        show: false,
      },
    ],
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          inside: true,
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
          show: true,
        },
      },
    ],
    legend: {
      show: true,
      top: 'middle',
      right: '0%',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 10,
      orient: 'vertical', // 竖着排列
      formatter: (name: string) => {
        return name.replace(/\s+/g, '') // 使用 <br> 分隔每个图例文字
      },
      textStyle: {
        fontSize: 8,
        color: '#fff',
        padding: [0, 40, 0, 0],
      },
    },
    series: series,
  }
  const myChart = echarts.init(charts.value!)
  myChart.setOption(option)
})
</script>
