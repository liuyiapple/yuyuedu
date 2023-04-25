import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import router from '@/router/index'
import pinia from './store/index'
import { createApp } from 'vue'
import './styles.less'
const app = createApp(App)
app.use(router)
app.mount('#app')
app.use(pinia)
