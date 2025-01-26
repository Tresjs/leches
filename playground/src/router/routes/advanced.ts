export const advancedRoutes = [
  {
    path: '/advanced/folders',
    name: 'Folders',
    component: () => import('../../pages/advanced/folders.vue'),
  },
  {
    path: '/advanced/multiple-instances',
    name: 'Multiple Instances',
    component: () => import('../../pages/advanced/multiple-instances/MultipleInstances.vue'),
  },
  {
    path: '/advanced/stacked',
    name: 'Stacked',
    component: () => import('../../pages/advanced/stacked.vue'),
  },
]
