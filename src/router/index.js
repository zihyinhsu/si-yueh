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
        meta: { title: '徙閱二手書' }
      },
      {
        path: 'search',
        component: () => import('../views/front/SearchView.vue'),
        meta: { title: '全站搜尋' }
      },
      {
        path: 'collection',
        component: () => import('../views/front/MyCollection.vue'),
        meta: { title: '我的收藏' }
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue'),
        meta: { title: '單一產品內頁' }
      },
      {
        path: 'login',
        component: () => import('../views/front/LoginView.vue'),
        meta: { title: '登入頁面' }
      }
      // 結帳流程還沒做
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/admin/AdminView.vue'),
    meta: { title: '後台管理' },
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/ProductsView.vue'),
        meta: { title: '商品管理' }
      },
      {
        path: 'orders',
        component: () => import('../views/admin/OrdersView.vue'),
        meta: { title: '訂單管理' }
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/CouponView.vue'),
        meta: { title: '優惠券管理' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
    meta: { title: '找不到相關頁面' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 讓選項變成啟用中的樣式
  linkActiveClass: 'active'

})
// router 命名
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
export default router
