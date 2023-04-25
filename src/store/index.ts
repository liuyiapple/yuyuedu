import { createPinia } from 'pinia'
const pinia = createPinia()
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserterStore = defineStore('echarts', () => {
  const school = ref<string>()
  const setRef = (r) => {
    school.value = r
  }
  return {
    school,
    setRef,
  }
})
pinia.use(piniaPluginPersistedstate)
export default pinia
