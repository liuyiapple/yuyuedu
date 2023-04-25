<template>
  <div class="header_right">
    <div class="reading">
      <img src="@/assets/title_icon.png" alt="" /> <span>阅读指数概况</span>
    </div>
    <div class="select">
      <!-- 封装一个选择器 -->
      <div class="custom-select">
        <select
          v-model="selectedValue"
          @change="selectOption"
          class="select_btn"
        >
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <div class="select-arrow"></div>
      </div>
    </div>
  </div>
  <img src="@/assets/righttitle_border.png" alt="" class="line_img" />
  <div class="read_btn_box">
    <span
      class="read_btn"
      v-for="item in readList"
      :key="item.value"
      @click="readingQuantity(item.value)"
    >
      {{ item.label }}</span
    >
  </div>
  <div class="left_bar1" v-if="show">
    <Histogram :xData="xData" :data="dataValue" />
  </div>
  <div class="left_bar">
    <div class="pai_title">
      <span></span>
      <p>各学校学生阅读情况</p>
    </div>
    <BarCharts
      v-if="showBar"
      :lineColor="lineColor"
      :schoolReading="schoolData"
      :seriesData="seriesData"
    />
  </div>
  <div class="reading">
    <img src="@/assets/title_icon.png" alt="" /> <span>阅读任务完成量</span>
  </div>
  <img src="@/assets/righttitle_border.png" alt="" class="line_img" />
  <!-- 阅读任务完成量 pia 图 -->
  <div class="loop_box">
    <LoopCharts :data="finishDataRef" />
    <div class="right_reading">
      <div class="three_show" v-for="item in showText">
        <div class="left_point">
          <span class="point"></span>
          <span class="show_text">{{ item.value }}</span>
          <span>
            <i>{{ item.label }}</i
            >%
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="reading">
    <img src="@/assets/title_icon.png" alt="" /> <span>阅读兴趣</span>
  </div>
  <img src="@/assets/righttitle_border.png" alt="" class="line_img" />
  <div class="chart_pai">
    <PaiCharts />
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import Histogram from '@/components/Echarts/histogram.vue'
import PaiCharts from '@/components/Echarts/PaiCharts.vue'
import LoopCharts from '@/components/Echarts/loop.vue'
import BarCharts from '@/components/Echarts/barCharts.vue'
import {
  getReadingSituation,
  getReadFinish,
  getReadRight,
} from '@/service/index'
const selectedValue = ref(1)
const lineColor = ref(['#132025', '#097793', '#01C7F9'])
const xData = ref()
const ydsc = ref()
const zxydl = ref()
const bdydl = ref()
const dataValue = ref()
const finishDataRef = ref()
const show = ref(false)
const showBar = ref(false)
// 右侧柱状图
const schoolData = ref()
const seriesData = ref()

const initData = async () => {
  const { data } = await getReadingSituation()
  xData.value = data.map((item: any) => item.month)
  dataValue.value = data.map((item: any) => item.ydl)
  ydsc.value = data.map((item: any) => item.ydsc)
  zxydl.value = data.map((item: any) => item.zxydl)
  bdydl.value = data.map((item: any) => item.bdydl)
  show.value = true
  // 阅读任务完成量
  const finishData = await getReadFinish()
  finishDataRef.value = finishData.data
  // 右侧柱状图
  const rightReadIdata = await getReadRight()
  console.log(rightReadIdata, 'rightReadIdatarightReadIdatarightReadIdata')

  showBar.value = true
  schoolData.value = rightReadIdata.data.map((item: any) => item.school_name)
  seriesData.value = rightReadIdata.data.map((item: any) => item.ratio)
}

onBeforeMount(() => {
  initData()
})

const readingQuantity = (value: number) => {
  switch (value) {
    case 2:
      dataValue.value = ydsc.value
      break
    case 3:
      dataValue.value = zxydl.value
      break
    case 4:
      dataValue.value = bdydl.value
      break
    default:
      break
  }
  console.log(dataValue.value)
}
const options = [
  {
    label: '近半年',
    value: 1,
  },
  {
    label: '近一年',
    value: 2,
  },
]
const selectOption = () => {
  console.log('select')
}
const readList = ref([
  {
    label: '阅读时长',
    value: 1,
  },
  {
    label: '阅读量',
    value: 2,
  },
  {
    label: '必读书目阅读量',
    value: 3,
  },
  {
    label: '自选书目阅读量',
    value: 4,
  },
])

const showText = [
  {
    value: '全区阅读任务完成率',
    label: 90,
  },
  {
    value: '平均每天完成率',
    label: 90,
  },
  {
    value: '平均每月完成情况',
    label: 90,
  },
]
</script>
<style lang="less" scoped>
.header_right {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .reading {
    span {
      font-size: 1.25rem;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #16cffe;
    }
  }
}
.reading {
  span {
    font-size: 1.25rem;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #16cffe;
  }
}
.line_img {
  width: 100%;
}
.read_btn_box {
  margin-bottom: 30px;
  // margin-top: 10px;
  display: flex;
  justify-content: space-between;
  .read_btn {
    height: 30px;
    font-size: 16px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #04fdf4;
    padding: 0 10px;
    background: #001321;
    border: 1px solid #0e7b98;
    border-radius: 14px 0px 14px 0px;
    // margin-top: 100px;
    line-height: 30px;
    cursor: pointer;
  }
}
.loop_box {
  display: flex;
  margin-left: 17px;
  justify-content: space-between;
  padding: 0 20px;
  .right_reading {
    display: flex;
    flex-direction: column;
    .three_show {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      width: 200px;
      height: 20px;
      line-height: 20px;
      background: #112e57;
      opacity: 0.2;
      border-radius: 8px;
      font-size: 8px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      text-align: center;
      color: #fff;
      .left_point {
        display: flex;
        flex-direction: space-between;
        align-items: center;
      }
      .point {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 8px;
        border-radius: 50%;
        background-color: #83f9f8;
      }
    }
  }
}
.select {
  margin-bottom: 10px;
}
.select_btn {
  width: 100px;
  height: 30px;
  background: #001321;
  border: 1px solid #0e7b98;
  border-radius: 10px;
  color: #fff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  outline: none;
  padding-left: 10px;
}
.chart_pai {
  margin-top: -50px;
}
.left_bar1 {
  margin-left: 20px;
}
.left_bar {
  margin-left: 50px;
  box-sizing: border-box;
  .pai_title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    line-height: 10px;
    margin-top: 20px;
    box-sizing: border-box;
    span {
      width: 6px;
      height: 1px;
      background: #00cbff;
      line-height: 5px;
    }
    p {
      margin-left: 3px;
    }
  }
}
</style>
