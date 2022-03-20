<template>
    <div style="cursor: default;" @click="dropdownMenu">
        <div class="cart-header py-4 d-flex flex-column align-items-center border-bottom-2">
            <p class="fs-4 fw-bold text-primaryDark letter-md-spacing border-primary">購書車</p>
        </div>
        <div class="cart-body overflow-auto h-100 p-2" style="max-height:70vh;">
            <ul class="h-100">
              <div class="d-flex justify-content-end p-2" v-if="tempCartData.carts.length">
                <div class="btn btn-outline-secondary"
                @click="delAllCart(tempCartData.carts.id)">清空購物車
                <span v-show="isLoadingItem === tempCartData.carts.id">
                  <i class="fas fa-spinner fa-pulse ms-1"></i></span></div>
              </div>
              <!-- 如果購物車為空 -->
              <div class="w-100 d-flex flex-column align-items-center py-5"
              v-if="tempCartData.carts.length === 0">
                <i class="fa-solid fa-triangle-exclamation text-primaryDark fa-2x mb-3"></i>
                  <p class="fw-bold mb-4">購書車內還沒有商品呢 ~</p>
                  <router-link class="btn btn-primaryDark" to="/search">查找書籍
                    <i class="fa-solid fa-book-open-reader ms-2"></i></router-link>
              </div>
              <!-- 購物車品項 -->
                <li class="d-flex justify-content-between align-items-center border-bottom-1 p-3" v-for="item in tempCartData.carts" :key="item.id">
                    <div class="d-flex align-items-center w-100">
                        <router-link class="rounded-1 overflow-hidden me-2 cursor-pointer" :to="`/product/${item.product.id}`" style="width:80px;">
                            <img class="ratio ratio-3x4" :src="item.product.imageUrl" :alt="item.product.title">
                        </router-link>
                        <div class="cart-body w-100 me-4">
                            <p class="fw-bold">{{item.product.title}}</p>
                            <p class="fw-bold text-primaryDark">NT$ {{item.product.price}}</p>
                            <div class="input-group">
                                <div class="input-group w-md-75">
                                    <button class="btn btn-outline-primary minus fs-small" type="button"
                                    @click="updateCartItem(item, item.qty--)" :class="{'disabled':item.qty<=1}">
                                        <i class="fa-solid fa-minus"></i>
                                    </button>
                                    <input type="number" class="form-control text-center fs-small" min="1" max="10"
                                    v-model.lazy="item.qty" @change="updateCartItem(item)">
                                    <button class="btn btn-primary plus fs-small" type="button"
                                     @click="updateCartItem(item,item.qty++)" :class="{'disabled':item.qty>=10}">
                                        <i class="fa-solid fa-plus text-white"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="delCartItem" @click="delCartItem(item.id)">
                      <i class="fa-solid fa-trash text-secondary cursor-pointer"></i>
                    </div>
                </li>
                <!-- 小計 -->
                <div class="p-3" v-show="tempCartData.carts.length">
                  <p class="text-end mb-4">
                    小計 : <span class="text-primary fw-bold">NT$ {{tempCartData.final_total}}</span>
                    </p>
                    <div class="btn btn-primaryDark w-100">確認結帳</div>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import emitter from '@/methods/emitter.js'
export default {
  props: ['cartData'],
  data () {
    return {
      tempCartData: {
        carts: []
      },
      isLoadingItem: ''
    }
  },
  watch: {
    cartData: {
      handler () {
        this.tempCartData = JSON.parse(JSON.stringify(this.cartData))
      },
      deep: true
    }
  },
  methods: {
    // dropDown點擊後不消失
    dropdownMenu (e) {
      e.stopPropagation()
    },
    updateCartItem (item, qty = 1) {
      if (item.qty <= 0) {
        item.qty = 1
      } else if (item.qty > 10) {
        item.qty = 10
      }
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, {
        data: {
          product_id: item.id,
          qty: Number(item.qty)
        }
      })
        .then((res) => {
          emitter.emit('get-cart-list')
          alert(res.data.message)
        }).catch((err) => {
          alert(err.data.message)
        })
    },
    delCartItem (id) {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((res) => {
          emitter.emit('get-cart-list')
          alert(res.data.message)
        }).catch((err) => {
          alert(err.data.message)
        })
    },
    delAllCart (id) {
      this.isLoadingItem = id
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          this.isLoadingItem = ''
          emitter.emit('get-cart-list')
          alert(res.data.message)
        }).catch((err) => {
          alert(err.data.message)
        })
    }
  }
}
</script>
