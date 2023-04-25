import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/index.vue'),
      meta: { title: '驾驶舱' },
    },
  ],
})

export default router
