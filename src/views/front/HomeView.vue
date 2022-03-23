<template>
<LoadingView :active="isLoading">
    <img src="../../assets/images/loading.gif" style="height:200px;width:200px">
  </LoadingView>
<!-- banner swiper -->
<div class="bg-light">
  <div class="container py-7">
    <swiper
    :slidesPerView="1"
    :spaceBetween="10"
    :centeredSlides="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="bannerSwiper banner rounded-4 overflow-hidden"
  >
    <swiper-slide>
      <img src="https://images.unsplash.com/photo-1630343710506-89f8b9f21d31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="">
      <p class="text-white text-shadow center text-center fw-bold fs-md-4 fs-5 w-100 letter-md-spacing">從流浪的書頁，重拾閱讀的況味</p>
    </swiper-slide>
    <swiper-slide>
      <img src="https://images.unsplash.com/photo-1531053270060-6643c8e70e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="">
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

  <div class="bg-light">
    <div class="container py-7">
      <div class="banner rounded-4 overflow-hidden">
        <div class="position-relative">
          <div class="position-absolute w-100 h-100 d-inline-block bg-dark-mask"></div>
        <img src="https://blog.libro.fm/wp-content/uploads/ashley-byrd-KVby0S0GaH4-unsplash.jpg" alt="">
          <div class="center w-75 w-md-auto">
            <h2 class="text-white text-shadow fs-5 fs-md-1 fw-bold mb-3 mb-md-6 text-center">現在加入會員，立享八折優惠!</h2>
            <div class="btn btn-primary fs-small fs-md-5 text-white fw-bold w-100">馬上領取<i class="fa-solid fa-arrow-pointer ms-2"></i></div>
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

// import required modules
import { Autoplay, Pagination } from 'swiper'
export default {
  mixins: [swiperMixin],
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    SwiperComponent
  },
  setup () {
    return {
      modules: [Autoplay, Pagination]
    }
  },
  mounted () {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }
}
</script>
