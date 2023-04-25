<template>
  <div ref="chartRef" style="width: 410px; height: 151px" class="charts"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
const chartRef = ref<HTMLElement | null>(null)
const props = defineProps<{
  xData?: string[]
  data?: data[]
}>()
onMounted(() => {
  // 初始化 ECharts 实例

  // 设置 ECharts 配置项
  const option = {
    grid: {
      width: '80%',
      height: '80%',
      left: '10%',
      top: '20%',
      containLabel: true,
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
      backgroundColor: 'rgba(10,133,235,0.64)',
      borderColor: '#0CADF8',
      borderWidth: 1,
      extraCssText:
        'width: 85px; height: 54px; opacity: 0.7; border-radius: 3px; text-align: center;',
      formatter: function () {
        var res =
          '<div style="font-size: 14px; color: white;">阅读人数</div><div style="font-size: 14px; color: white;">' +
          5090 +
          '</div>'
        return res
      },
    },
    xAxis: [
      {
        type: 'category',
        axisLabel: {
          color: '#fff',
          textStyle: {
            fontSize: 14,
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#788eb0',
          },
        },
        axisTick: {
          show: false,
        },

        data: props.xData,
      },
    ],
    yAxis: [
      {
        type: 'value',
        nameTextStyle: {
          color: '#fff',
          fontSize: 14,
          padding: [0, 0, 0, -30],
        },
        min: 0,
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#306269',
            type: 'dashed',
          },
        },
      },
    ],
    series: [
      {
        name: '次数',
        type: 'line',
        symbol: 'circle',
        smooth: true, // 添加 smooth 属性
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#2af7ff',
            lineStyle: {
              color: '#2af7ff',
              width: 3,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: 'RGBA(42, 247, 255, 0.2)',
                },
                {
                  offset: 1,
                  color: 'RGBA(42, 247, 255, 0.8)',
                },
              ]),
            },
          },
        },
        data: props.data,
      },
    ],
  }

  // 使用 ECharts 实例和配置项初始化图表
  const myChart = echarts.init(chartRef.value!)
  myChart.setOption(option)
  // 在窗口大小变化时自动调整图表大小
  window.addEventListener('resize', () => myChart.resize())
})
// 监听 props 变化，重新渲染图表
watch(
  () => props.data,
  () => {
    const myChart = echarts.init(chartRef.value!)
    myChart.setOption({
      xAxis: [
        {
          data: props.xData,
        },
      ],
      series: [
        {
          data: props.data,
        },
      ],
    })
  }
)
</script>
<style lang="less" scoped></style>
