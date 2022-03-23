import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/front/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'search',
        component: () => import('../views/front/SearchView.vue')
      },
      {
        path: 'collection',
        component: () => import('../views/front/MyCollection.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue')
      },
      {
        path: 'login',
        component: () => import('../views/front/LoginView.vue')
      }
      // 結帳流程還沒做
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/admin/AdminView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/ProductsView.vue'),
        meta: {
          metaInfo: {
            title: '後台產品列表'
          }
        }
      },
      {
        path: 'orders',
        component: () => import('../views/admin/OrdersView.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/CouponView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 讓選項變成啟用中的樣式
  linkActiveClass: 'active',
  // 對於所有路由導航，簡單地讓頁面滾動到頂部
  scrollBehavior (to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})
// router 命名
// router.beforeEach((to, from, next) => {
//   window.document.title = to.meta.title
//   next()
// })
export default router
