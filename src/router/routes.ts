//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute = [
  {
    // 🈯/:pathMatch(.*)*表示任意路由，🟥若其余所有路由规则都没有匹配上，就会匹配任意路由，则重定向至404路由规则中
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'DataLine',
    },
  },
  //default route
  {
    path: '/',
    redirect: '/layout',
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    path: '/layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },

  //404 fail router
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete',
    },
  },

  //   {
  //     //登录成功以后展示数据的路由
  //     path: '/',
  //     component: () => import('@/views/layout/index.vue'),
  //     name: 'layout',
  //     meta: {
  //       title: '',
  //       hidden: false,
  //       icon: '',
  //     },
  //     redirect: '/home',
  //     children: [
  //       {
  //         path: '/home',
  //         component: () => import('@/views/home/index.vue'),
  //         meta: {
  //           title: '首页',
  //           hidden: false,
  //           icon: 'HomeFilled',
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     //404
  //     path: '/404',
  //     component: () => import('@/views/404/index.vue'),
  //     name: '404',
  //     meta: {
  //       title: '404',
  //       hidden: true,
  //       icon: 'DocumentDelete',
  //     },
  //   },
  //   //   {
  //   //     path: '/screen',
  //   //     component: () => import('@/views/screen/index.vue'),
  //   //     name: 'Screen',
  //   //     meta: {
  //   //       hidden: false,
  //   //       title: '数据大屏',
  //   //       icon: 'Platform',
  //   //     },
  //   //   },
  //   {
  //     //任意路由
  //     path: '/:pathMatch(.*)*',
  //     redirect: '/404',
  //     name: 'Any',
  //     meta: {
  //       title: '任意路由',
  //       hidden: true,
  //       icon: 'DataLine',
  //     },
  //   },
]

// //异步路由
// export const asnycRoute = [
//   {
//     path: '/acl',
//     component: () => import('@/layout/index.vue'),
//     name: 'Acl',
//     meta: {
//       title: '权限管理',
//       icon: 'Lock',
//     },
//     redirect: '/acl/user',
//     children: [
//       {
//         path: '/acl/user',
//         component: () => import('@/views/acl/user/index.vue'),
//         name: 'User',
//         meta: {
//           title: '用户管理',
//           icon: 'User',
//         },
//       },
//       {
//         path: '/acl/role',
//         component: () => import('@/views/acl/role/index.vue'),
//         name: 'Role',
//         meta: {
//           title: '角色管理',
//           icon: 'UserFilled',
//         },
//       },
//       {
//         path: '/acl/permission',
//         component: () => import('@/views/acl/permission/index.vue'),
//         name: 'Permission',
//         meta: {
//           title: '菜单管理',
//           icon: 'Monitor',
//         },
//       },
//     ],
//   },
//   {
//     path: '/product',
//     component: () => import('@/layout/index.vue'),
//     name: 'Product',
//     meta: {
//       title: '商品管理',
//       icon: 'Goods',
//     },
//     redirect: '/product/trademark',
//     children: [
//       {
//         path: '/product/trademark',
//         component: () => import('@/views/product/trademark/index.vue'),
//         name: 'Trademark',
//         meta: {
//           title: '品牌管理',
//           icon: 'ShoppingCartFull',
//         },
//       },
//       {
//         path: '/product/attr',
//         component: () => import('@/views/product/attr/index.vue'),
//         name: 'Attr',
//         meta: {
//           title: '属性管理',
//           icon: 'ChromeFilled',
//         },
//       },
//       {
//         path: '/product/spu',
//         component: () => import('@/views/product/spu/index.vue'),
//         name: 'Spu',
//         meta: {
//           title: 'SPU管理',
//           icon: 'Calendar',
//         },
//       },
//       {
//         path: '/product/sku',
//         component: () => import('@/views/product/sku/index.vue'),
//         name: 'Sku',
//         meta: {
//           title: 'SKU管理',
//           icon: 'Orange',
//         },
//       },
//     ],
//   },
// ]

//任意路由
// export const anyRoute = {
//   //任意路由
//   path: '/:pathMatch(.*)*',
//   redirect: '/404',
//   name: 'Any',
//   meta: {
//     title: '任意路由',
//     hidden: true,
//     icon: 'DataLine',
//   },
// }
