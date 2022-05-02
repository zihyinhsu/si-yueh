<template>
  <LoadingView class="loading" :active="isLoading">
    <img src="../../assets/images/loading.gif" alt="Loading">
  </LoadingView>
  <div class="bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <!-- 麵包屑 -->
        <nav aria-label="breadcrumb ">
          <ol class="breadcrumb py-3 py-md-6 m-0">
            <li class="breadcrumb-item"><router-link class="text-secondaryDark text-decoration-underline fs-small fs-md-5" to="/">首頁</router-link></li>
            <li class="breadcrumb-item ps-1"><a href="#" class="text-secondaryDark text-decoration-underline fs-small fs-md-5" to="/search" @click.prevent="transferCate">{{ product.category }}</a></li>
            <li class="breadcrumb-item ps-1 text-secondaryDark active" aria-current="page"><span class="fs-small fw-bold fs-md-5">{{ product.title }}</span></li>
          </ol>
        </nav>
        <!-- 書籍基本資料 -->
        <div class="row justify-content-center align-items-center border-bottom border-2 px-0 pt-3 pb-9">
          <div class="col-8 col-md-3 mb-5 mb-md-0">
            <img class="ratio ratio-3x4 rounded-4 box-shadow" :src="product.imageUrl" :alt="product.title">
          </div>
          <div class="col-md-4 mb-4 mb-md-0 border-end-md-2">
            <div class="bookTitle mb-4">
              <h2 class="fs-3 fw-bold mb-1">{{ product.title }}</h2>
              <p class="fs-4 mb-2" v-if="product.subTitle">{{ product.subTitle }}</p>
              <span class="bg-primary text-white fs-5 px-2 py-1">{{ product.category }}</span>
            </div>
            <div class="bookData mb-4">
              <p class="fs-5 mb-2">作者 : {{ product.author }}</p>
              <p class="fs-5 mb-2">出版社 : {{ product.publishing_house }}</p>
              <p class="fs-5 mb-2">出版日期 : {{ product.publication_date }}</p>
              <p class="fs-5">庫存 : {{ product.inventory }} {{ product.unit }}</p>
            </div>
            <div class="bookPrice mb-4">
              <p class="text-primary fs-4 fw-bold">定價 : NT$ {{ product.price }}</p>
            </div>
            <div class="d-flex justify-content-between justify-content-md-start w-100">
              <div class="btn w-85 w-md-auto me-3" :class="favoriteId.includes(product.id) ? 'btn-primaryLight text-white' : 'btn-outline-primary'"
              @click="toggleFavorite(product)">
                <i class="fa-solid fa-bookmark me-3"></i><span>{{ favoriteId.includes(product.id) ? '取消':'加入' }}收藏</span>
              </div>
              <div class="btn btn-primary text-white w-100 w-md-auto" @click="addToCart(product)">
                <i class="fa-solid fa-cart-plus me-3"></i>加入購書車<span v-show="isLoadingItem === product.id"><i class="fas fa-spinner fa-pulse ms-1"></i></span>
                </div>
            </div>
          </div>
          <div class="col-md-5 mt-4 mt-md-0">
            <div class="bookIntroContent">
              <p class="fs-5 fs-md-4 fw-bold text-center" v-html="product.content"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- 詳細書籍資料 -->
  <div class="container">
    <div class="row pt-9 pb-9">
      <div class="col-md-7 mb-6 mb-md-0">
        <div class="mb-12">
          <h2 class="bg-white category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"># 詳細書訊</h2>
          <p v-html="product.description"></p>
        </div>
        <div v-if="product.table_contents">
          <h2 class="bg-white category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"># 目錄</h2>
          <p v-html="product.table_contents"></p>
        </div>
      </div>
      <div class="col-md-5">
        <div class="position-sticky top-20">
          <div :class="{'mb-6': product.translator_intro}">
            <h2 class="bg-white category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"># 作者簡介</h2>
            <p v-html="product.author_intro"></p>
          </div>
          <div :class="{'mb-6': product.illustrator_intro}" v-if="product.translator_intro">
            <h2 class="bg-white category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"># 譯者簡介</h2>
            <p v-html="product.translator_intro"></p>
          </div>
          <div v-if="product.illustrator_intro">
            <h2 class="bg-white category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"># 繪者簡介</h2>
            <p v-html="product.illustrator_intro"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <h2 class="category bg-white fs-3 d-inline-block text-primaryDark p-2 fw-bold"># 喜歡這本的人，也看了 ...</h2>
  </div>
  <SwiperComponent
  :category="product.category" :id="product.id"
  :showTitle="false" @change-page="getProduct"></SwiperComponent>
  </div>
</template>

<script>

import SwiperComponent from '@/components/front/SwiperComponent.vue'
import swiperMixin from '@/mixins/swiperMixin'
import collectionMixin from '@/mixins/collectionMixin'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'
export default {
  mixins: [swiperMixin, collectionMixin],
  components: {
    SwiperComponent
  },
  data () {
    return {
      product: [],
      isLoading: false
    }
  },
  watch: {
    product: {
      handler () {
        this.product.publication_date = this.product.publication_date.split('-').join('/')
      }
    }
  },
  computed: {
    ...mapState(cartStore, ['cartData']),
    ...mapState(statusStore, ['isLoadingItem'])
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    getProduct () {
      const id = this.$route.params.id
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
          // 根據頁面切換，改變頁面title名稱
          document.title = this.product.title
          this.isLoading = false
          // 最近瀏覽紀錄
          this.resentlyViewed(this.product)
        }).catch(() => {
          this.isLoading = false
        })
    },
    transferCate () {
      this.$router.push('/search')
      // 利用localStorage存取資料
      localStorage.setItem('category', this.product.category)
      localStorage.setItem('isActive', this.product.category)
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
