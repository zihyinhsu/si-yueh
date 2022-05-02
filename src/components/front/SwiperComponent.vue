<template>
  <div class="container py-7">
    <h2 class="category fs-4 fs-md-3 d-inline-block text-primaryDark p-2 fw-bold mb-7"
    :class="{'bg-light': titlebgColor }"
    v-if="showTitle" style="background-color:white"
    ># {{ category }}</h2>
    <swiper
    :slidesPerView="1.7"
    :spaceBetween="20"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :breakpoints="{
      '768': {
        slidesPerView: 5,
        spaceBetween: 24,
      },
    }"
    :modules="modules"
    class="bookSwiper rounded-4 h-100 p-2">
      <swiper-slide class="swiperSlide bookCoverImg d-flex flex-column" v-for="item in products" :key="item.id"
      :class="{'d-none': id === item.id }" style="max-width: 196px;">
      <!-- ↑若產品內頁的產品id與推薦書籍id相同則隱藏 -->
        <div class="position-relative rounded-4 overflow-hidden mb-3 hoverBoxShadow hoverCard">
          <router-link class="bookHover fadeIn" :to="`/product/${item.id}`">
            <img class="ratio ratio-3x4" v-lazy="item.imageUrl" :alt="item.title">
          </router-link>
          <div class="btn btn-primary position-absolute bottom-0 w-100 text-white"
            @click="addToCart(item)">
            <i class="fa-solid fa-cart-plus me-3"></i>加入購書車 <span v-show="isLoadingItem === item.id">
            <i class="fas fa-spinner fa-pulse ms-1"></i></span>
          </div>
          <div class="bookMark btn btn-sm position-absolute top-0 end-0 rounded-circle m-2"
            @click="toggleFavorite(item)" :class="favoriteId.includes(item.id) ? 'btn-primaryDark':'btn-primaryLight'">
            <span class="material-icons-outlined text-white fs-5 mt-1" v-if="favoriteId.includes(item.id)">bookmark</span>
            <span class="material-icons-outlined text-white fs-5 mt-1" v-else>bookmark_border</span>
          </div>
        </div>
        <div class="flex-grow-1">
          <router-link class="text-primaryDark d-block fw-bold text-truncate fs-4" :to="`/product/${item.id}`">{{ item.title }}</router-link>
          <p>{{ item.author }}</p>
        </div>
        <p class="text-primary fw-bold fs-3">NT$ {{ item.price }}</p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import swiperMixin from '@/mixins/swiperMixin'
import collectionMixin from '@/mixins/collectionMixin'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'

export default {
  // category、titlebgColor是在外層元件上自訂的屬性，用來篩選每個元件內的products資料
  props: {
    category: {
      type: String
    },
    id: {
      type: String
    },
    titlebgColor: {
      type: Boolean
    },
    showTitle: {
      type: Boolean
    }
  },
  mixins: [swiperMixin, collectionMixin],
  data () {
    return {
      pageId: this.$route.params.id,
      products: []
    }
  },
  watch: {
    // 監聽產品內頁的category變化
    category () {
      this.getProducts(this.category)
    },
    // 監聽動態路由變化
    $route (to) {
      this.pageId = to.params.id
      this.$emit('change-page')
      this.getProducts(this.category)
    }
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(statusStore, ['pushMsg']),
    getProducts (category) {
      let url = ''
      if (category === '最近瀏覽') {
        this.products = this.resentlyViewdProducts
        return
      } else if (category === '最新上架') {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
      } else if (category) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${category}`
      }
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products
        }).catch(() => {
          this.pushMsg(false, '載入', '請重新整理')
        })
    }
  },
  computed: {
    ...mapState(cartStore, ['cartData']),
    ...mapState(statusStore, ['isLoadingItem', 'isLoading'])
  },
  mounted () {
    this.getProducts(this.category)
  }
}
</script>
