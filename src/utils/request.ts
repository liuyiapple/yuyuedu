import router from '@/router'
import axios, { AxiosError, Method } from 'axios'
const serve = axios.create({
  baseURL: 'https://wsbs.sx.gov.cn:8080/dingM/',
  timeout: 5000,
})
serve.interceptors.request.use((config) => {
  return config
})

serve.interceptors.response.use(
  ({ data }) => {
    return data as any
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
export default serve

type Data<T> = {
  code: number
  message: string
  data: T
}

export const request = <T>(url: string, method: Method, data?: object) => {
  return serve.request<any, Data<T>>({
    url,
    method,
    [method.toLocaleUpperCase() === 'GET' ? 'params' : 'data']: data,
  })
}
