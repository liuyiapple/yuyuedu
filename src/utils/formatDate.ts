// 将当前时间格式话为2023-03-02  08:26:20  星期五 实时时间
const formatTime = (time: number) => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const week = date.getDay()
  const weekStr = ['日', '一', '二', '三', '四', '五', '六']
  return `${year}-${month}-${day} ${hour}:${minute}:${second} 星期${weekStr[week]}`
}
export { formatTime, timer }
