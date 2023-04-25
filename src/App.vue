<template>
  <RouterView />
</template>
<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { onMounted, ref, watchEffect } from 'vue'
const viewWidth = ref(window.innerWidth)
const viewHeight = ref(window.innerHeight)
onMounted(() => {
  window.onresize = () => {
    return (() => {
      viewWidth.value = window.innerWidth
      viewHeight.value = window.innerHeight
    })()
  }
})
watchEffect(() => {
  let ratio = window.innerWidth / 1920 // 计算当前宽度是否改变
  // rem适配
  const oHtml = document.getElementsByTagName('html')[0]
  oHtml.style.fontSize = `${16 * ratio}px`
  console.log(ratio)
})

watchEffect(() => {
  let ratio = window.innerHeight / 929 // 计算当前高度是否改变
  // rem适配
  const oHtml = document.getElementsByTagName('html')[0]
  oHtml.style.fontSize = `${16 * ratio}px`
  console.log(ratio)
})
</script>
<style lang="less" scoped></style>
