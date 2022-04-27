<template>
  <div ref="cart" class="cursor-default">
    <div  @click="dropdownMenu">
      <div class="cart-header py-4 d-flex flex-column align-items-center border-bottom-2">
        <p class="fs-4 fw-bold text-primaryDark letter-md-spacing border-primary">購書車</p>
      </div>
      <div class="cart-body overflow-auto h-100 max-h-70vh p-2">
        <ul class="h-100">
          <div class="d-flex justify-content-end p-2" v-if="cartData.carts.length">
            <div class="btn btn-light text-primaryDark fw-bold"
            @click="delAllCart(cartData.carts)">清空購書車
            <span v-show="isLoadingItem === cartData.carts.id">
              <i class="fas fa-spinner fa-pulse ms-1"></i></span></div>
          </div>
          <!-- 如果購書車為空 -->
          <div class="w-100 d-flex flex-column align-items-center py-5"
            v-if="cartData.carts.length === 0">
            <i class="fa-solid fa-triangle-exclamation text-primaryDark fa-2x mb-3"></i>
              <p class="fw-bold mb-4">購書車內還沒有商品呢 ~</p>
              <router-link class="btn btn-primaryDark" to="/search">查找書籍
                <i class="fa-solid fa-book-open-reader ms-2"></i></router-link>
          </div>
          <!-- 購書車品項 -->
          <li class="d-flex justify-content-between align-items-center border-bottom-1 p-3" v-for="item in cartData.carts" :key="item.id">
            <div class="d-flex align-items-center w-100">
              <router-link class="rounded-1 overflow-hidden cursor-pointer me-2 w-40 w-md-30" :to="`/product/${item.product.id}`">
                  <img class="ratio ratio-3x4" :src="item.product.imageUrl" :alt="item.product.title">
              </router-link>
              <div class="cart-body w-100 me-4">
                <p class="fw-bold">{{ item.product.title }}</p>
                <p class="text-danger fw-bold fs-small" v-if="item.coupon">已套用優惠券</p>
                <p class="fw-bold text-primaryDark">NT$ {{ item.product.price }}
                  <span class="text-danger fs-small" v-if="item.qty>=item.product.inventory">選取已達上限</span>
                </p>
                <div class="input-group">
                    <div class="input-group w-md-75">
                        <button class="btn btn-outline-primary minus fs-small" type="button"
                        @click="updateCart(item, item.qty--)" :class="{'disabled':item.qty<=1}">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <input type="number" class="form-control text-center box-shadow-none fs-small" min="1" :max="item.product.inventory"
                        v-model.lazy="item.qty" @change="updateCart(item)" readonly>
                        <button class="btn btn-primary plus fs-small" type="button"
                          @click="updateCart(item,item.qty++)" :class="{'disabled':item.qty>=item.product.inventory}">
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
        </ul>
        <!-- 小計 -->
        <div class="p-3" v-show="cartData.carts.length">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="已套用優惠券" v-if="cartData.final_total !== cartData.total" disabled>
            <input type="text" class="form-control" placeholder="輸入優惠券" v-else v-model="coupon_code" aria-label="coupon" aria-describedby="coupon">
            <button class="btn btn-primary text-white" type="button" id="coupon"
            @click="addCouponCode" :class="{'disabled':cartData.final_total !== cartData.total}">套用優惠券</button>
          </div>
          <p class="text-end mb-3">
            小計 : <span class="text-primary fw-bold">NT$ {{ cartData.total }}</span>
          </p>
          <p class="text-secondaryDark fw-bold text-end mb-3"
            v-if="cartData.final_total !== cartData.total">
            折扣價 : NT${{ final_total }}
          </p>
          <router-link to="/checkorder" class="btn btn-primaryDark w-100" @click="this.$refs.cart.click()">確認結帳</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 匯入 mapState、 mapActions 方法
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'

export default {
  data () {
    return {
      final_total: ''
    }
  },
  watch: {
    cartData: {
      handler () {
        this.final_total = Math.round(this.cartData.final_total)
      },
      deep: true
    }
  },
  computed: {
    ...mapState(cartStore, ['cartData', 'coupon_code']),
    ...mapState(statusStore, ['isLoadingItem'])
  },
  methods: {
    ...mapActions(cartStore, ['getCartList', 'updateCart', 'delCartItem', 'delAllCart', 'addCouponCode']),
    // dropDown點擊後不消失
    dropdownMenu (e) {
      e.stopPropagation()
    }
  },
  mounted () {
    this.getCartList()
  }
}
</script>

<style lang="scss" scoped>
.cursor-default{
  cursor: default;
}
.max-h-70vh{
  max-height:70vh;
}
</style>
