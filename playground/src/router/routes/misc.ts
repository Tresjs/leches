export const miscRoutes = [
  {
    path: '/misc/fpsgraph',
    name: 'FPSgraph',
    component: () => import('../../pages/misc/FPSgraphDemo.vue'),
  },
  {
    path: '/misc/dark-mode',
    name: 'DarkMode',
    component: () => import('../../pages/misc/DarkModeDemo.vue'),
  },
]
