<template>
    <div ref="cart" style="cursor: default;">
      <div  @click="dropdownMenu">
         <div class="cart-header py-4 d-flex flex-column align-items-center border-bottom-2">
            <p class="fs-4 fw-bold text-primaryDark letter-md-spacing border-primary">購書車</p>
        </div>
        <div class="cart-body overflow-auto h-100 p-2" style="max-height:70vh;">
            <ul class="h-100">
              <div class="d-flex justify-content-end p-2" v-if="tempCartData.carts.length">
                <div class="btn btn-outline-secondary"
                @click="delAllCart(tempCartData.carts)">清空購物車
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
                            <p class="fw-bold text-primaryDark">NT$ {{item.product.price}}
                              <span class="text-danger fs-small" v-if="item.qty>=item.product.inventory">選取已達上限</span>
                            </p>
                            <div class="input-group">
                                <div class="input-group w-md-75">
                                    <button class="btn btn-outline-primary minus fs-small" type="button"
                                    @click="updateCartItem(item, item.qty--)" :class="{'disabled':item.qty<=1}">
                                        <i class="fa-solid fa-minus"></i>
                                    </button>
                                    <input type="number" class="form-control text-center fs-small" min="1" :max="item.product.inventory"
                                    v-model.lazy="item.qty" @change="updateCartItem(item)" readonly>
                                    <button class="btn btn-primary plus fs-small" type="button"
                                     @click="updateCartItem(item,item.qty++)" :class="{'disabled':item.qty>=item.product.inventory}">
                                        <i class="fa-solid fa-plus text-white"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="delCartItem" @click="delCartItem(item)">
                      <i class="fa-solid fa-trash text-secondary cursor-pointer"></i>
                    </div>
                </li>
                <!-- 小計 -->
                <div class="p-3" v-show="tempCartData.carts.length">
                  <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="已套用優惠券" v-if="tempCartData.final_total !== tempCartData.total" disabled>
                      <input type="text" class="form-control" placeholder="輸入優惠券" v-else v-model="coupon_code" aria-label="coupon" aria-describedby="coupon">
                      <button class="btn btn-primary text-white" type="button" id="coupon"
                      @click="addCouponCode" :class="{'disabled':tempCartData.final_total !== tempCartData.total}">套用優惠券</button>
                    </div>
                  <p class="text-end mb-3">
                    小計 : <span class="text-primary fw-bold">NT$ {{tempCartData.total}}</span>
                    </p>
                    <p class="text-secondaryDark fw-bold text-end mb-3"
                      v-if="tempCartData.final_total !== tempCartData.total">
                      折扣價 : NT${{final_total}}
                     </p>
                    <router-link to="/checkorder" class="btn btn-primaryDark w-100" @click="this.$refs.cart.click()">確認結帳</router-link>
                </div>
            </ul>
        </div>
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
        carts: {}
      },
      isLoadingItem: '',
      coupon_code: '',
      final_total: ''
    }
  },
  watch: {
    cartData: {
      handler () {
        this.tempCartData = JSON.parse(JSON.stringify(this.cartData))
        this.final_total = Math.round(this.tempCartData.final_total)
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
      if (item.qty <= 1) {
        item.qty = 1
      } else if (item.qty >= item.product.inventory) {
        item.qty = item.product.inventory
      }
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, {
        data: {
          product_id: item.product.id,
          qty: Number(item.qty)
        }
      })
        .then((res) => {
          emitter.emit('get-cart-list')
          emitter.emit('push-cart-data', item)
          this.$StatusMsg(res, '更新', '已成功更新購書車')
        }).catch(() => {
          this.$StatusMsg(false, '更新', '更新購書車失敗')
        })
    },
    delCartItem (item) {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`)
        .then((res) => {
          emitter.emit('get-cart-list')
          emitter.emit('push-cart-data', item)
          this.$StatusMsg(res, '刪除', '已成功刪除品項')
        }).catch(() => {
          this.$StatusMsg(false, '刪除', '刪除品項失敗')
        })
    },
    delAllCart (item) {
      this.isLoadingItem = item.id
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          this.isLoadingItem = ''
          emitter.emit('get-cart-list')
          emitter.emit('push-cart-data', item)
          this.$StatusMsg(res, '刪除', '已成功刪除所有品項')
        }).catch(() => {
          this.$StatusMsg(false, '刪除', '刪除所有品項失敗')
        })
    },
    addCouponCode () {
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`, {
        data: { code: this.coupon_code }
      })
        .then((res) => {
          this.$emit('get-cart-list')
          this.$StatusMsg(res, '套用', '已套用優惠券')
        }).catch(() => {
          this.$StatusMsg(false, '套用', '套用優惠券失敗')
        })
    }
  }
}
</script>
