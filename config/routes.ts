export default [
  {
    exact: false,
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '/user',
        layout: false,
        routes: [
          {
            path: '/user',
            routes: [
              {
                name: '登录',
                title: '请登录',
                path: '/user/login',
                component: '@/pages/user/Login',
              },
            ],
          },
        ],
      },
      {
        exact: true,
        name: '控制台',
        title: 'Dashboard',
        path: '/',
        component: '@/pages/dashboard/index',
      },
      {
        exact: true,
        name: '产品信息管理',
        title: 'Product Information Management',
        path: '/product',
        component: '@/pages/product/index',
      },
      {
        exact: true,
        name: '任务及变更',
        title: 'Task & Alteration',
        path: '/task',
        component: '@/pages/task/index',
      },
      {
        exact: true,
        name: '数据管理和分析',
        title: 'Dataset Management & Analysis',
        path: '/dataset',
        redirect: '/',
        component: '@/pages/task/index',
      },
      {
        exact: true,
        name: '质量规则管理及批次处理',
        title: 'Quality Rules Management & Batch Dispose',
        path: '/rules',
        component: '@/pages/rules/index',
      },
      {
        component: '@/pages/404',
      },
    ],
  },
];
