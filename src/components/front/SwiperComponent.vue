<template>
<div class="container py-7" v-if="swiperShow">
    <h2 class="category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"
    :class="{'bg-light': titlebgColor }"
    v-if="showTitle" style="background:white"
    ># {{category}}</h2>
    <swiper
    :slidesPerView="1.5"
    :spaceBetween="20"
    :pagination="{
      clickable: true,
    }"
    :breakpoints="{
      '768': {
        slidesPerView: 5,
        spaceBetween: 24,
      },
    }"
    class="bookSwiper rounded-4 h-100 p-2">
    <swiper-slide class="swiperSlide" v-for="item in products" :key="item.id"
      :class="{'d-none': id === item }">
      <!-- ↑若產品內頁的產品id與推薦書籍id相同則隱藏 -->
        <div class="bookCoverImg position-relative rounded-4 overflow-hidden mb-3 hoverBoxShadow">
          <router-link :to="`/product/${item.id}`">
            <img class="ratio ratio-3x4" :src="item.imageUrl" :alt="item.title">
            </router-link>
            <div class="btn btn-primary position-absolute bottom-0 w-100 text-white"
            @click="addToCart(item)">
                <i class="fa-solid fa-cart-plus me-3"></i>加入購物車 <span v-show="isLoadingItem === item.id">
                  <i class="fas fa-spinner fa-pulse ms-1"></i></span>
                </div>
              <div class="bookMark btn btn-sm position-absolute top-0 end-0 rounded-circle m-2"
              @click="toggleFavorite(item)" :class="favoriteId.includes(item.id) ? 'btn-primaryDark':'btn-primaryLight'">
                <span class="material-icons-outlined text-white fs-5 mt-1" v-if="favoriteId.includes(item.id)">bookmark</span>
                <span class="material-icons-outlined text-white fs-5 mt-1" v-else>bookmark_border</span>
              </div>
        </div>
        <p class="fs-4">{{item.title}}</p>
        <p>{{item.author}}</p>
        <p class="text-primary fw-bold fs-3">NT$ {{item.price}}</p>
        </swiper-slide>
  </swiper>
</div>
</template>

<script>
import swiperMixin from '@/mixins/swiperMixin'

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
  mixins: [swiperMixin],
  data () {
    return {
      pageId: this.$route.params.id,
      products: [],
      isLoadingItem: '',
      swiperShow: false,
      cartData: {
        carts: []
      },
      favorite: JSON.parse(localStorage.getItem('favorite')) || [],
      favoriteId: JSON.parse(localStorage.getItem('favoriteId')) || []
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
    },
    // 用locolstorage自訂欄位並存取資料
    favorite: {
      handler () {
        // localStorage只接受字串
        localStorage.setItem('favorite', JSON.stringify(this.favorite))
        // this.$emitter.emit('push-favorite', this.favorite)
      },
      deep: true
    },
    favoriteId: {
      handler () {
        localStorage.setItem('favoriteId', JSON.stringify(this.favoriteId))
      },
      deep: true
    }
  },
  methods: {
    getProducts (category) {
      let url = ''
      if (category === '最新上架') {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
      } else if (category) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${category}`
      }
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products
          this.swiperShow = true
        }).catch((err) => {
          console.log(err)
        })
    },
    addToCart (product, qty = 1) {
      this.isLoadingItem = product.id
      // 篩選出cartData與指定商品中id相同的資料
      let temp = this.cartData.carts.filter((item) => item.product_id === product.id)
      // 取陣列中第一個物件
      temp = { ...temp[0] }
      const resultQty = temp.qty + qty
      if (resultQty > product.inventory) {
        this.isLoadingItem = ''
        this.$StatusMsg(false, '加入', '加入購書車失敗')
      } else {
        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
          data: {
            product_id: product.id,
            qty
          }
        }).then((res) => {
          this.$emitter.emit('get-cart-list')
          this.$StatusMsg(res, '加入', '已成功加入購物車')
          this.isLoadingItem = ''
        }).catch(() => {
          this.$StatusMsg(false, '加入', '加入購書車失敗')
        })
      }
    },
    toggleFavorite (product) {
      // findIndex 會回傳第一個符合條件的陣列元素的索引
      const favoriteIndex = this.favorite.findIndex((item) => item.id === product.id)
      // 如果沒有搜到符合的元素，就將資料推進this.favorite裡面
      if (favoriteIndex === -1) {
        this.favorite.push(product)
        this.favoriteId.push(product.id)
        this.$StatusMsg(true, '收藏', '已成功收藏')
      } else {
        // 如果搜到符合的元素，就取消收藏。
        this.favorite.splice(favoriteIndex, 1)
        this.favoriteId.splice(favoriteIndex, 1)
        this.$StatusMsg(false, '收藏', '已取消收藏')
      }
    }
  },
  mounted () {
    this.getProducts(this.category)
    this.$emitter.emit('get-cart-list')
    // 接收來自FrontNavbar的cartData資料
    this.$emitter.on('push-cart-data', (cartData) => {
      this.cartData = cartData
    })
    // localStorage.clear()
  }
}
</script>
