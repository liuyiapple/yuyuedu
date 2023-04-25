import { request } from '@/utils/request'
import { useUserterStore } from '@/store/index'
const store = useUserterStore()
const getReadIndex = () => {
  return request('/', 'POST')
}
export const getBorrow = (data: string = '崧厦街道') => {
  return request(
    `/screen/bookBorrowNumByMonth?schoolType=${
      store.school === '小学' ? 1 : 2
    }&belongStreet=${data}&session=&academicYear=`,
    'POST'
  )
}
/**
 * 阅读指数
 * @param data 地区
 * @returns
 */
export const getReadingSituation = (data = '崧厦街道') => {
  return request(
    `/screen/getReadTrendByMonth?schoolType=&belongStreet=${data}&session=&academicYear=`,
    'POST'
  )
}

/**
 * 阅读指数概况
 * @param data 地区
 * @returns
 */
export const getReadIndexLeft = (data: string = '百官街道') => {
  return request(
    `screen/getStudentRead?schoolType=2&session=&academicYear=&belongStreet=${data}`,
    'POST'
  )
}

/**
 * 学生阅读人数趋势
 */

export const getStudentIndex = () => {
  return request(
    'screen/getStudentReadNumByMonth?schoolType=2&session=&academicYear=',
    'POST'
  )
}

// 阅读完成量
export const getReadFinish = (
  address: string = '百官街道',
  rank: string = store.school
) => {
  return request(
    `screen/getScreenTaskCompletes?belongStreet=${address}&organizeAlias=${store.school}`,
    'POST'
  )
}

// 右侧柱状图
export const getReadRight = (
  address: string = '百官街道',
  rank: string = store.school
) => {
  return request(
    `screen/getAlreadyStuRatio?belongStreet=${address}&organizeAlias=${store.school}`,
    'POST'
  )
}
