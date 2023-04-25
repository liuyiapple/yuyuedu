<template>
  <div class="title_text">
    <img src="@/assets/title_icon.png" alt="" />
    <span style="font-size: 11px !important">阅读指数概况</span>
  </div>
  <div class="reading">
    <div class="text_first">
      <div class="one">
        <div>
          <strong>{{ readindex.ydl || 0 }}</strong
          >本
        </div>
        <div>学校</div>
        <div>阅读数量</div>
      </div>
      <div class="two">
        <div>
          <strong>{{ readindex.ydrs || 0 }}</strong
          >人
        </div>
        <div>学生</div>
        <div>阅读人数</div>
      </div>
      <div class="three">
        <div>
          <strong>{{ readindex.zxydl || 0 }}</strong
          >本
        </div>
        <div>页/人</div>
        <div>阅读均量</div>
      </div>
      <div class="four">
        <div>
          <strong>{{ readindex.ydsc || 0 }}</strong
          >小时
        </div>
        <div>学生</div>
        <div>阅读均时</div>
      </div>
      <div class="five">
        <div>
          <strong>{{ readindex.ydxl || 0 }}</strong
          >%
        </div>
        <div>必读完成度</div>
      </div>
      <div class="six">
        <div>
          <strong>{{ readindex.zxydl || 0 }}</strong
          >页
        </div>
        <div>自选阅读</div>
        <div>均量</div>
      </div>
      <div class="seven">
        <div>
          <strong>{{ readindex.ydxl || 0 }}</strong
          >页/时
        </div>

        <div>阅读效率</div>
      </div>
      <div class="eight">
        <div>
          <strong>{{ readindex.rjjy || 0 }}</strong
          >本
        </div>
        <div>人均</div>
        <div>图书借阅</div>
      </div>
    </div>
  </div>
  <div class="read_num">
    <div class="read_person">学生阅读人数趋势</div>
    <div class="chart" v-if="show">
      <Histogram :xData="xData" :data="dataValue" />
    </div>
  </div>
  <div class="borrow_book">
    <img src="@/assets/title_icon.png" alt="" />
    <span class="text">图书借阅情况</span>
    <img src="@/assets/righttitle_border.png" alt="" />
    <div class="static">全区校内校外各类图书馆累计借阅量</div>
    <div class="show_num">
      <div class="lcb_text"><span>8765</span><i>本</i></div>
      <!-- <div class="huan_text"><span>环比</span> <i>+6.3%</i></div> -->
      <!-- <div class="huan_text"><span>环比</span> <i>+6.3%</i></div> -->
    </div>
    <BarCharts
      v-if="showBar"
      :lineColor="lineColor"
      :schoolReading="schoolReading"
      :seriesData="seriesData"
    />
  </div>
  <!-- <DIalog /> -->
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue'
import Histogram from '../Echarts/histogram.vue'
import BarCharts from '@/components/Echarts/barCharts.vue'
import { getBorrow, getReadIndexLeft, getStudentIndex } from '@/service/index'
import { useUserterStore } from '@/store/index'
const store = useUserterStore()
const lineColor = ref(['#141E21', '#8F7810', '#FAC901'])
const xData = ref(['1月', '2月', '3月', '4月', '5月'])
const dataValue = ref<any>([])
const readindex = ref<any>({})
const schoolReading = ref<any>([])
const seriesData = ref<any>([])
const show = ref(false)
const showBar = ref(false)

const getInitData = async () => {
  const { data } = await getReadIndexLeft()
  // TODO street 和 all 的数据格式不一样
  readindex.value = data.all
  const { data: res } = await getStudentIndex()
  xData.value = res.map((item) => item.month)
  dataValue.value = res.map((item) => item.ydrs)
  show.value = true
  // 阅读指数
  const { data: borrow } = await getBorrow()
  showBar.value = true
  schoolReading.value = borrow.map((item) => item.m)
  seriesData.value = borrow.map((item) => item.bnum)
}
onBeforeMount(async () => {
  getInitData()
})
watch(
  () => store.school,
  () => {
    console.log(store.school)
    getInitData()
  }
)
</script>

<style lang="less" scoped>
@import './index.less';
.title_text {
  span {
    font-size: 11px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #16cffe;
  }
}
.read_num {
  .read_person {
    .chart {
      margin-left: -100px;
    }
  }
}
</style>
