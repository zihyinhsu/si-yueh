<template>
<div class="bg-light">
    <div class="container p-md-0">
      <div class="row justify-content-center">
         <!-- 麵包屑 -->
      <nav aria-label="breadcrumb ">
        <ol class="breadcrumb py-3 py-md-6 m-0">
          <li class="breadcrumb-item"><router-link class="text-secondaryDark fs-small fs-md-5" to="/">首頁</router-link></li>
          <li class="breadcrumb-item"><router-link class="text-secondaryDark fs-small fs-md-5" to="/search">全站搜尋</router-link></li>
          <li class="breadcrumb-item text-secondaryDark active" aria-current="page"><span class="fs-small fw-bold fs-md-5">{{product.title}}</span></li>
        </ol>
      </nav>
      <!-- 書籍基本資料 -->
      <div class="row justify-content-center align-items-center border-bottom border-2 px-0 pt-5 pb-9">
          <div class="col-8 col-md-3 mb-4 mb-md-0">
          <img class="ratio ratio-4x3 rounded-4" :src="product.imageUrl" :alt="product.title">
        </div>
        <div class="col-md-4 mb-4 mb-md-0 border-end-md-2">
          <div class="bookTitle mb-4">
            <div class="d-flex align-items-center mb-2">
              <h2 class="fs-3 fw-bold">{{product.title}}</h2>
              <p class="p-1 bg-primary text-white fs-5 ms-3">{{product.category}} </p>
            </div>
            <p class="fs-4" v-if="product.subTitle">{{product.subTitle}}</p>
          </div>
          <div class="bookData mb-4">
            <p class="fs-5 mb-2">作者 : {{product.author}}</p>
            <p class="fs-5 mb-2">出版社 : {{product.publishing_house}}</p>
            <p class="fs-5 mb-2">出版日期 : {{product.publication_date}}</p>
            <p class="fs-5">庫存 : {{product.inventory}} {{product.unit}}</p>
          </div>
          <div class="bookPrice mb-4">
            <p class="text-primary fs-5 fs-md-4 fw-bold mb-2">定價 : <span class="text-decoration-line-through">NT$ {{product.origin_price}}</span></p>
            <p class="text-primary fs-5 fs-md-4 fw-bold">優惠價 : NT$ {{product.price}}</p>
          </div>
          <div class="d-flex justify-content-between justify-content-md-start w-100">
            <div class="btn btn-outline-primary w-90 w-md-auto me-3">
              <i class="fa-solid fa-bookmark me-3"></i>加入收藏
              </div>
            <div class="btn btn-primary text-white w-100 w-md-auto" @click="addToCart(product.id)">
              <i class="fa-solid fa-cart-plus me-3"></i>加入購書車<span v-show="isLoadingItem === product.id"><i class="fas fa-spinner fa-pulse ms-1"></i></span>
              </div>
          </div>
        </div>
        <div class="col-md-5 mt-4 mt-md-0">
          <div class="bookIntroContent">
            <p class="fs-5 fs-md-4 fw-bold text-center " v-html="product.content"></p>
          </div>
        </div>
      </div>
      </div>
  </div>

  <div class="container p-md-0">
    <div class="row px-0 pt-5 pb-9">
      <div class="col-md-7 mb-6 mb-md-0">
        <h2 class="bg-white category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"># 詳細書訊</h2>
        <p v-html="product.description"></p>
      </div>
      <div class="col-md-5 mb-6">
          <div class="col mb-6">
              <h2 class="bg-white category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"># 作者簡介</h2>
              <p v-html="product.author_intro"></p>
            </div>
          <div class="col">
            <h2 class="bg-white category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"
            v-if="product.translator_intro"># 譯者簡介</h2>
            <p v-html="product.translator_intro"></p>
          </div>
          <div class="col mb-6">
            <h2 class="bg-white category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"
            v-if="product.illustrator_intro"># 繪者簡介</h2>
            <p v-html="product.illustrator_intro"></p>
          </div>

          <div class="col">
          <h2 class="bg-white category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"># 目錄</h2>
          <p v-html="product.table_contents"></p>
        </div>
      </div>

    </div>
     <!-- <div class="row mb-6">
          <div class="col-6">
            <h2 class="bg-white category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"
            v-if="product.translator_intro"># 譯者簡介</h2>
            <p v-html="product.translator_intro"></p>
          </div>
          <div class="col-6">
            <h2 class="bg-white category fs-3 d-inline-block text-primaryDark p-2 fw-bold"
            v-if="product.illustrator_intro"># 繪者簡介</h2>
            <p v-html="product.illustrator_intro"></p>
          </div>
      </div> -->
  </div>
  <div class="container">
      <h2 class="category bg-white fs-3 d-inline-block text-primaryDark p-2 fw-bold"># 喜歡這本的人，也看了 ...</h2>
  </div>
  <SwiperComponent :category="product.category" :id="product.id" :showTitle="false"></SwiperComponent>
</div>
</template>

<script>
import SwiperComponent from '@/components/front/SwiperComponent.vue'
import swiperMixin from '@/mixins/swiperMixin'
import emitter from '@/methods/emitter.js'
export default {
  mixins: [swiperMixin],
  components: {
    SwiperComponent
  },
  data () {
    return {
      product: [],
      isLoadingItem: ''
    }
  },
  methods: {
    getProduct () {
      const id = this.$route.params.id
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
        }).catch((err) => {
          console.log(err)
        })
    },
    addToCart (id, qty = 1) {
      this.isLoadingItem = id
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
        data: {
          product_id: id,
          qty
        }
      }).then((res) => {
        emitter.emit('get-cart-list')
        alert(res.data.message)
        this.isLoadingItem = ''
      }).catch((err) => {
        alert(err)
      })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
