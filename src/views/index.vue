<template>
  <div class="home_page">
    <header class="header_container">
      <h1>“虞阅读”数智阅读驾驶舱</h1>
      <div class="time_container">
        <div class="left_time">{{ formatTime(new Date()) }}</div>
        <div class="right_welcome">欢迎回来，管理员</div>
      </div>
    </header>
    <nav>
      <div class="left_box">
        <LeftContaier />
      </div>
      <div class="center_box">
        <CenterContaier />
      </div>
      <div class="right_box">
        <RightContaier />
      </div>
    </nav>
  </div>
</template>
<script lang="ts" setup>
import { formatTime } from '@/utils/formatDate'
import LeftContaier from './LeftContainer/index.vue'
import RightContaier from './RightContainer/index.vue'
import CenterContaier from './Center/index.vue'
</script>
<style scoped lang="less">
@import './index.less';
</style>
