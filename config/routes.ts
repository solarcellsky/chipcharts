export default [
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
      {
        component: '@/pages//404',
      },
    ],
  },
  {
    exact: true,
    name: '首页',
    title: 'Dashboard',
    path: '/',
    component: '@/pages/dashboard/index',
  },
];
