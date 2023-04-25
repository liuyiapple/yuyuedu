<template>
  <div class="center_container">
    <div class="header">
      <div class="left">
        <img src="@/assets/icon_area.png" alt="" />
        <span class="area"> 上虞区>百官街道 </span>
      </div>
      <div class="right">
        <div v-if="changeTab">
          <img src="@/assets/tab1.png" alt="" />
        </div>
        <div v-else>
          <img src="@/assets/tab2.png" alt="" />
        </div>
        <div class="cocalAchool">
          <span @click="changeHandle(1)" class="xiao">小学</span>
          <span @click="changeHandle()">初中</span>
        </div>
      </div>
    </div>
    <div class="charts">
      <Map></Map>
    </div>
    <div class="footer">
      <div class="first">
        <img src="@/assets/title_icon.png" alt="" /> 书香校园
      </div>
      <img src="@/assets/centertitle_line.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Map from '@/components/Map/index.vue'
import { useUserterStore } from '@/store/index'
const store = useUserterStore()
const changeTab = ref(false)

const changeHandle = (num?: number) => {
  if (num) {
    changeTab.value = true
    store.school = '小学'
  } else {
    changeTab.value = false
    store.school = '初中'
  }
}
</script>

<style lang="less" scoped>
.center_container {
  padding: 0 30px;
  .header {
    display: flex;
    justify-content: space-between;
    .left {
      img {
        vertical-align: middle;
        padding-bottom: 10px;
      }
      .area {
        font-size: 20px;
        color: #fff;
      }
    }
    .right {
      position: relative;
      .cocalAchool {
        z-index: 10000;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        font-size: 9px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
        cursor: pointer;
        .xiao {
          margin-right: 65px;
          padding-left: 30px;
        }
      }
    }
  }
  .charts {
    margin-top: -250px;
  }
  .footer {
    .first {
      vertical-align: middle;
      font-size: 11px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #16cffe;
    }
  }
}
</style>
