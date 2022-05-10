<template>
  <LoadingView class="loading" :active="isLoading">
      <img src="../../assets/images/loading.gif" alt="Loading">
  </LoadingView>
  <!-- banner swiper -->
  <div class="bg-light">
    <div class="container py-7">
      <swiper
      :slidesPerView="1"
      :spaceBetween="10"
      :centeredSlides="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="banner rounded-4 overflow-hidden">
      <swiper-slide>
        <img src="https://images.unsplash.com/photo-1630343710506-89f8b9f21d31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt="徙閱二手書">
        <div class="center d-flex flex-column justify-content-center w-80 w-md-auto">
          <p class="text-white text-shadow text-center fw-bold fs-5 fs-md-4 letter-md-spacing mb-2 mb-md-4">從流浪的書頁，重拾閱讀的況味</p>
          <router-link to="/search" class="btn btn-sm btn-light text-primaryDark fw-bold fs-md-5">開始選書
          <i class="fa-solid fa-book-open ms-1"></i></router-link>
        </div>
      </swiper-slide>
      <swiper-slide>
        <router-link to="/product/-Myka4NeeZmHgOA5ynp2">
          <img src="https://storage.googleapis.com/vue-course-api.appspot.com/zy123/1652155238738.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=kKoKaL2ZNu9BGANQwc6qMn1HcnCxxG9PBZxy6WbSnPP4v8XCQWCmoh3YKKEIY5%2BFELU4PAxNMIwpyFHZyAFwIKOd5bqIoLe12fcnE3ojw3udJA3%2BX7yHcqR2fGgUFQ8zTnXVY2YO8HnN0Fv7qbBTz6tDBLnu4E%2BRNKtkQwfN%2BjlkT9Kc%2Fdy2NQWwfrGDVwX5JR3OwDY69H%2BBXLKO6le3Wi6gIzsV7z7%2Bhva%2BiRar%2F327bwTMKBSVibeHiZctx7Zua7bmjYC6mI3K%2BIeyvQyUWHRBQ2t5jzetCsWu4AL%2F9zcx75RfP0FXhH9H6t9BUTymWtb%2FlYw04ap6papp%2FBXO4Q%3D%3D">
        </router-link>
      </swiper-slide>
    </swiper>
    </div>
  </div>
  <!-- banner swiper -->
  <SwiperComponent category="最新上架" :titlebgColor="true" :showTitle="true"></SwiperComponent>
  <div class="bg-light">
    <SwiperComponent category="文學小說" :showTitle="true"></SwiperComponent>
  </div>
  <SwiperComponent category="商業管理" :titlebgColor="true" :showTitle="true"></SwiperComponent>

  <div class="bg-light" id="cta">
    <div class="container py-7">
      <div class="banner rounded-4 overflow-hidden">
        <div class="position-relative">
          <div class="position-absolute w-100 h-100 d-inline-block bg-dark-mask"></div>
          <div class="second-banner bg-attachment-md-fixed"></div>
          <div class="center w-75 w-md-auto">
            <h2 class="text-white text-shadow fs-5 fs-md-1 fw-bold mb-3 mb-md-6 text-center">現在完成首購，立享八折優惠!</h2>
            <div class="btn btn-primary fs-small fs-md-5 text-white fw-bold w-100" @click="copyCouponCode('2022si-yueh')">馬上領取<i class="fa-solid fa-arrow-pointer ms-2"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SwiperComponent category="社會人文" :titlebgColor="true" :showTitle="true"></SwiperComponent>
  <div class="bg-light">
    <SwiperComponent category="其它" :showTitle="true"></SwiperComponent>
  </div>
</template>

<script>
import SwiperComponent from '@/components/front/SwiperComponent.vue'
import swiperMixin from '@/mixins/swiperMixin'

import { mapState, mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
import cartStore from '@/stores/cartStore'
import goAnchor from '@/stores/goAnchor'

export default {
  mixins: [swiperMixin],
  components: {
    SwiperComponent
  },
  computed: {
    ...mapState(statusStore, ['isLoading']),
    ...mapState(goAnchor, ['anchorActive'])
  },
  methods: {
    ...mapActions(statusStore, ['loadingEffect']),
    ...mapActions(cartStore, ['copyCouponCode']),
    ...mapActions(goAnchor, ['goAnchor'])
  },
  mounted () {
    this.loadingEffect()
  }
}
</script>
