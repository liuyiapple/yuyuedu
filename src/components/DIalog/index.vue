<template>
  <div class="table" v-if="showDialof">
    <!-- 宽579 高439 的 居中和 盒子 -->
    <div class="card">
      <div class="header">
        <div>
          <img src="@/assets/title_icon.png" alt="" /> <span>学生阅读情况</span>
        </div>
        <img
          class="fenge"
          src="@/assets/dialog/icon_close.png"
          alt=""
          @click="closwHandel"
        />
      </div>
      <div class="change">
        <button @click="changetab(1)" :class="[select ? 'btn' : '']">
          小学
        </button>
        <button @click="changetab(2)" :class="[select ? '' : 'btn']">
          初中
        </button>
      </div>
      <Table
        :columns="columns"
        :data="tableData"
        :actions="actions"
        @action-click="handleActionClick"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Table from '@/components/Table/index.vue'
const select = ref(false)
const showDialof = ref(true)
const columns = [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'age',
    label: '年龄',
  },
]
const tableData = [
  {
    id: 1,
    name: '张三',
    age: 20,
  },
  {
    id: 2,
    name: '李四',
    age: 30,
  },
]
const actions = [
  {
    label: '编辑',
  },
]
const handleActionClick = () => {
  console.log(1)
}
const closwHandel = () => {
  showDialof.value = false
}
const changetab = (num: number) => {
  if (num === 1) {
    select.value = true
  } else {
    select.value = false
  }
}
</script>
<style lang="less" scoped>
.table {
  width: 99vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    width: 800px;
    height: 609px;
    border: #16cffe 1px solid;
    padding: 20 !important;
    .header {
      color: #16cffe;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #16cffe;
    }

    .change {
      margin-top: 20px;
      button {
        width: 100px;
        height: 30px;
        background: rgba(255, 255, 255, 0);
        border: 1px solid #19bffd;
        color: #fff;
        margin-left: 10px;
        cursor: pointer;
      }
      .btn {
        background: #19bffd;
        color: #000;
      }
    }
  }
}
</style>
