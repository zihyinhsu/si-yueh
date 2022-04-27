<template>
  <div class="sticky-top" id="top">
    <!-- 首購優惠CTA -->
    <div class="anchor bg-primary cursor-pointer" @click="clickAnchor">
      <p class="text-center text-white p-2 fs-small fs-md-5">現在完成首購，立享八折優惠!
        <span class="ms-2"><i class="fa-solid fa-circle-down"></i></span>
      </p>
    </div>
    <!-- nav -->
    <nav class="navbar navbar-expand-lg navbar-white bg-white box-shadow">
      <div class="container">
        <!-- logo -->
        <router-link class="navbar-brand" to="/">
          <h1 class="logo">
            <img src="../../assets/images/logo.png" alt="徙閱二手書">
          </h1>
        </router-link>
        <!-- cart -->
        <div class="cart dropdown ms-auto cursor-pointer order-lg-3">
          <div class="text-secondaryDark" id="cartDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="d-flex">
              <div class="position-relative me-2 me-md-3" :class="{'bounced':isBounced}">
                <i class="fa-solid fa-cart-shopping"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
                v-if="cartData.carts.length != 0">{{ cartData.carts.length }}</span>
              </div>
              <span class="d-none d-md-block">購書車</span>
            </div>
          </div>
          <!-- cart -->
          <div class="dropdown-menu dropdown-menu-end vw-87.5 vw-md-27.5 rounded-4">
            <CartComponent @get-cart-list="getCartList"></CartComponent>
          </div>
        </div>
        <!-- 漢堡選單 -->
        <button class="navbar-toggler box-shadow-none px-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation"
        @click="navIconChange = !navIconChange">
          <span v-if="navIconChange">
            <i class="fa-solid fa-x text-secondaryDark"></i>
          </span>
          <span v-else>
            <i class="fa-solid fa-bars text-secondaryDark"></i>
          </span>
        </button>
        <!-- 摺疊 -->
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item me-md-5 py-1" @click="navCollapseBack">
              <router-link class="nav-link text-secondaryDark" to="/search">
              <i class="fa-solid fa-magnifying-glass me-2"></i>書籍查詢
              </router-link>
            </li>
            <li class="nav-item me-md-5 py-1" @click="navCollapseBack">
              <router-link class="nav-link text-secondaryDark" to="/collection">
              <i class="fa-solid fa-bookmark me-2"></i>收藏書單
              </router-link>
            </li>
            <li class="nav-item me-md-5 py-1" @click="navCollapseBack">
              <router-link class="nav-link text-secondaryDark" to="/orderSearch">
              <i class="fa-solid fa-file me-2"></i>訂單查詢
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import CartComponent from '@/components/front/CartComponent.vue'

// 匯入 mapState、 mapActions 方法
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'
import goAnchor from '@/stores/goAnchor'

export default {
  data () {
    return {
      navIconChange: false
    }
  },
  components: {
    CartComponent
  },
  computed: {
    ...mapState(cartStore, ['cartData']),
    ...mapState(statusStore, ['isBounced']),
    ...mapState(goAnchor, ['anchorActive'])
  },
  methods: {
    ...mapActions(cartStore, ['getCartList']),
    ...mapActions(goAnchor, ['clickAnchor']),
    // 判斷當螢幕為手機版時，點擊後選單自動收合
    navCollapseBack () {
      if (window.matchMedia('(max-width: 767px)').matches) {
        const navbarToggle = document.querySelector('.navbar-toggler')
        navbarToggle.click()
      }
    }
  }
}
</script>
