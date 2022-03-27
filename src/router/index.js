import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/front/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/front/HomeView.vue'),
        meta: {
          title: '徙閱二手書',
          requiresAuth: true
        }
      },
      {
        path: 'search',
        component: () => import('../views/front/SearchView.vue'),
        meta: {
          title: '全站搜尋 - 徙閱二手書',
          requiresAuth: true
        }
      },
      {
        path: 'collection',
        component: () => import('../views/front/MyCollection.vue'),
        meta: {
          title: '我的收藏 - 徙閱二手書',
          requiresAuth: true
        }
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue'),
        meta: {
          title: '書籍內頁 - 徙閱二手書',
          requiresAuth: true
        }
      },
      {
        path: 'login',
        component: () => import('../views/front/LoginView.vue'),
        meta: {
          title: '請先登入 - 徙閱二手書',
          requiresAuth: true
        }
      },
      {
        path: 'checkorder',
        component: () => import('../views/front/CheckOrder.vue'),
        meta: {
          title: '建立訂單 - 結帳頁面',
          requiresAuth: true
        }
      },
      {
        path: 'checkout/:id',
        component: () => import('../views/front/CheckOut.vue'),
        meta: {
          title: '確認付款 - 結帳頁面',
          requiresAuth: true
        }
      },
      {
        path: 'payment',
        component: () => import('../views/front/PaymentCompleted.vue'),
        meta: {
          title: '完成訂單 - 結帳頁面',
          requiresAuth: true
        }
      }
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
          title: '後台商品管理',
          requiresAuth: true
        }
      },
      {
        path: 'orders',
        component: () => import('../views/admin/OrdersView.vue'),
        meta: {
          title: '後台訂單管理',
          requiresAuth: true
        }
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/CouponView.vue'),
        meta: {
          title: '後台優惠券管理',
          requiresAuth: true
        }
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
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
export default router
