<template>
  <div
    class="charts"
    style="width: 380px; height: 300px; margin-top: -30px"
    ref="chartRef"
  ></div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
const chartRef = ref<HTMLElement>()
const props = defineProps<{
  schoolReading?: string[]
  lineColor?: string[]
  seriesData?: number[]
}>()
onMounted(() => {
  var option = {
    xAxis: {
      type: 'category',
      data: props.schoolReading,
      axisLine: {
        lineStyle: {
          color: '#306269',
        },
      },
      axisLabel: {
        rotate: 16, // 设置x轴标签旋转角度为45度
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#306269',
        },
      },
      min: 0,
      boundaryGap: ['10%', '10%'], // 设置y轴留白距离
      splitLine: {
        show: true, // 显示分割线
        lineStyle: {
          color: '#306269', // 设置分割线颜色
          type: 'dashed', // 设置分割线类型为虚线
        },
      },
    },
    series: [
      {
        data: props.seriesData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: props.lineColor?.[2] as string }, // 渐变色起始颜色
              { offset: 0.5, color: props.lineColor?.[1] as string }, // 渐变色中间颜色
              { offset: 1, color: props.lineColor?.[0] as string },
            ]),
          },
        },
        barWidth: 20,
      },
    ],
  }
  // 使用 ECharts 实例和配置项初始化图表
  const myChart = echarts.init(chartRef.value!)
  myChart.setOption(option)
})
watch(
  () => props.schoolReading,
  () => props.seriesData,
  () => {
    const myChart = echarts.init(chartRef.value!)
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: props.schoolReading,
        axisLine: {
          lineStyle: {
            color: '#306269',
          },
        },
        axisLabel: {
          rotate: 16, // 设置x轴标签旋转角度为45度
        },
      },
      series: [
        {
          data: props.seriesData,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: props.lineColor?.[2] as string }, // 渐变色起始颜色
                { offset: 0.5, color: props.lineColor?.[1] as string }, // 渐变色中间颜色
                { offset: 1, color: props.lineColor?.[0] as string },
              ]),
            },
          },
          barWidth: 20,
        },
      ],
    })
  }
)
</script>
<style lang="less" scoped></style>
