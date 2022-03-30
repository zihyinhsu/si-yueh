<template>
<div class="container pt-7" :class="favorite.length===0 ? 'vh-70' : 'vh-auto'">
    <!-- 如果收藏夾為空 -->
    <div class="w-100 d-flex flex-column align-items-center py-5 center"
        v-if="favorite.length===0">
        <i class="fa-solid fa-triangle-exclamation text-primaryDark fa-2x mb-3"></i>
            <p class="fw-bold mb-4">收藏夾內還沒有商品呢 ~</p>
            <router-link class="btn btn-primaryDark" to="/search">查找書籍
            <i class="fa-solid fa-book-open-reader ms-2"></i></router-link>
        </div>

    <div class="row row-cols-2 row-cols-md-5">
        <div class="col mb-7" v-for="item in favorite" :key="item.id">
            <div class="bookCoverImg-md position-relative rounded-4 overflow-hidden mb-3 hoverBoxShadow">
                <router-link :to="`/product/${item.id}`">
                    <img class="ratio ratio-3x4" :src="item.imageUrl" :alt="item.title">
                    </router-link>
                    <div class="btn btn-primary position-absolute bottom-0 w-100 text-white"
                    @click="addToCart(item)">
                        <i class="fa-solid fa-cart-plus me-3"></i>加入購物車 <span v-show="isLoadingItem === item.id">
                        <i class="fas fa-spinner fa-pulse ms-1"></i></span>
                        </div>
                    <div class="bookMark btn btn-sm position-absolute top-0 end-0 rounded-circle m-2"
                    @click="toggleFavorite(item)" :class="favorite.includes(item) ? 'btn-primaryDark':'btn-primaryLight'">
                        <span class="material-icons-outlined text-white fs-5 mt-1" v-if="favorite.includes(item)">bookmark</span>
                        <span class="material-icons-outlined text-white fs-5 mt-1" v-else>bookmark_border</span>
                    </div>
            </div>
        <p class="fs-4">{{item.title}}</p>
        <p>{{item.author}}</p>
        <p class="text-primary fw-bold fs-3">NT$ {{item.price}}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      cartData: {
        carts: []
      },
      isLoadingItem: '',
      favorite: JSON.parse(localStorage.getItem('favorite')) || [],
      favoriteId: JSON.parse(localStorage.getItem('favoriteId')) || []
    }
  },
  watch: {
    // 用locolstorage來自訂欄位並存取資料
    favorite: {
      handler () {
        // localStorage只接受字串
        localStorage.setItem('favorite', JSON.stringify(this.favorite))
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
      const favoriteIndex = this.favorite.findIndex((item) => item === product)
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
    this.$emitter.emit('get-cart-list')
    // 接收來自FrontNavbar的cartData資料
    this.$emitter.on('push-cart-data', (cartData) => {
      this.cartData = cartData
    })
    // localStorage.clear()
  }
}
</script>
