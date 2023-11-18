import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/folders',
    name: 'Folders',
    component: () => import('./pages/folders.vue'),
  },
  {
    path: '/buttons',
    name: 'Buttons',
    component: () => import('./pages/buttons.vue'),
  },
  {
    path: '/icons',
    name: 'Icons',
    component: () => import('./pages/icons.vue'),
  },
  {
    path: '/perf',
    name: 'Perf',
    component: () => import('./pages/perf.vue'),
  },
]
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
