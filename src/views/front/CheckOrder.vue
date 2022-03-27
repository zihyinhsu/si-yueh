<template>
  <LoadingView :active="isLoading">
    <img src="../../assets/images/loading.gif" style="height:200px;width:200px">
  </LoadingView>
   <div class="bg-light">
     <OrderNav :cartData="cartData"></OrderNav>
       <div class="container pt-4 pb-5 pb-md-9">
        <div class="row justify-content-center">
           <!-- 確認訂單 -->
            <div class="col-md-4">
                <h2 class="bg-white category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"># 確認訂單</h2>
                <!-- 如果購物車為空 -->
              <div class="w-100 d-flex flex-column align-items-center py-5"
              v-if="cartData.carts.length === 0">
                <i class="fa-solid fa-triangle-exclamation text-primaryDark fa-2x mb-3"></i>
                  <p class="fw-bold mb-4">購書車內還沒有商品呢 ~</p>
                  <router-link class="btn btn-primaryDark" to="/search">查找書籍
                    <i class="fa-solid fa-book-open-reader ms-2"></i></router-link>
              </div>
                <!-- 購物車品項 -->
                <li class="d-flex justify-content-between align-items-center border-bottom-1 p-3" v-for="item in cartData.carts" :key="item.id">
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
                <div class="p-3" v-show="cartData.carts.length">
                   <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="已套用優惠券" v-if="cartData.final_total !== cartData.total" disabled>
                      <input type="text" class="form-control" placeholder="輸入優惠券" v-else v-model="coupon_code" aria-label="coupon" aria-describedby="coupon">
                      <button class="btn btn-primary text-white" type="button" id="coupon"
                      @click="addCouponCode" :class="{'disabled':cartData.final_total !== cartData.total}">套用優惠券</button>
                    </div>
                  <p class="text-end mb-3">
                    小計 : <span class="text-primary fw-bold">NT$ {{cartData.total}}</span>
                    </p>
                    <p class="text-end text-danger mb-3 fw-bold" v-if="cartData.final_total !== cartData.total">折扣 : {{discount_price}}</p>
                    <p class="text-secondaryDark fw-bold text-end mb-3 fs-md-4"
                      v-if="cartData.final_total !== cartData.total">
                      折扣價 : NT${{final_total}}
                     </p>

                </div>
            </div>
            <div class="col-md-5 offset-md-1">
                <form-view ref="form" class="bg-white p-4 p-md-8" v-slot="{ errors }">
                  <h2 class="bg-light category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"># 收件人資料</h2>
                      <div class="mb-3">
                        <label for="email" class="form-label fw-bold">Email<span class="text-danger">*</span></label>
                        <field-view id="email" name="email" type="email" class="form-control"
                        :class="{ 'is-invalid': errors['email'] }" rules="email" placeholder="請輸入 Email"
                              v-model="form.user.email" ></field-view>
                        <error-message name="email" class="invalid-feedback text-start"></error-message>
                      </div>

                      <div class="mb-3">
                        <label for="name" class="form-label fw-bold">收件人姓名<span class="text-danger">*</span></label>
                        <field-view id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                                placeholder="請輸入姓名" rules="required" v-model="form.user.name"></field-view>
                        <error-message name="姓名" class="invalid-feedback"></error-message>
                      </div>

                      <div class="mb-3">
                        <label for="tel" class="form-label fw-bold">收件人電話<span class="text-danger">*</span></label>
                        <field-view id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                                placeholder="請輸入電話" :rules="isPhone" v-model="form.user.tel"></field-view>
                        <error-message name="電話" class="invalid-feedback"></error-message>
                      </div>

                      <div class="mb-3">
                        <label for="address" class="form-label fw-bold">收件人地址<span class="text-danger">*</span></label>
                        <field-view id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                                placeholder="請輸入地址" rules="required" v-model="form.user.address"></field-view>
                        <error-message name="地址" class="invalid-feedback"></error-message>
                      </div>

                      <div class="mb-3">
                        <label for="message" class="form-label fw-bold">備註</label>
                        <textarea id="message" class="form-control" v-model="form.message" style="min-height:100px; !important"></textarea>
                      </div>
                      <div class="text-end">
                        <button type="submit" class="btn btn-primary text-white w-100"
                        @click.prevent="onSubmit">送出訂單</button>
                      </div>
                    </form-view>
            </div>
        </div>
       </div>
   </div>
</template>

<script>
import OrderNav from '@/components/front/OrderNav'
export default {
  data () {
    return {
      cartData: {
        carts: {}
      },
      isLoading: false,
      coupon_code: '',
      final_total: '',
      discount_price: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      orderId: this.$route.params.id
    }
  },
  components: {
    OrderNav
  },
  watch: {
    cartData: {
      handler () {
        this.final_total = Math.round(this.cartData.final_total)
      },
      deep: true
    },
    final_total: {
      handler () {
        this.discount_price = this.final_total - this.cartData.total
      },
      deep: true
    }
  },
  methods: {
    getCartList () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
          this.isLoading = false
        }).catch((err) => {
          console.log(err)
        })
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
          this.$emitter.emit('get-cart-list')
          this.getCartList()
          this.$StatusMsg(res, '更新', '已成功更新購書車')
        }).catch(() => {
          this.$StatusMsg(false, '更新', '更新購書車失敗')
        })
    },
    delCartItem (item) {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`)
        .then((res) => {
          this.$emitter.emit('get-cart-list')
          this.getCartList()
          this.$StatusMsg(res, '刪除', '已成功刪除品項')
        }).catch(() => {
          this.$StatusMsg(false, '刪除', '刪除品項失敗')
        })
    },
    addCouponCode () {
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`, {
        data: { code: this.coupon_code }
      })
        .then((res) => {
          this.getCartList()
          this.$emit('get-cart-list')
          this.$StatusMsg(res, '套用', '已套用優惠券')
        }).catch(() => {
          this.$StatusMsg(false, '套用', '套用優惠券失敗')
        })
    },
    // 手機驗證
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    // 送出訂單
    onSubmit () {
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, { data: this.form })
        .then((res) => {
          this.$StatusMsg(res, '送出', '已成功送出訂單')
          this.form.message = ''
          this.getCartList()
          // 跳轉換頁
          this.$router.push(`/checkout/${res.data.orderId}`)
        }).catch(() => {
          this.$StatusMsg(false, '送出', '送出訂單失敗')
        })
    }
  },
  mounted () {
    this.getCartList()
    this.$emitter.emit('get-cart-list')
    this.$emitter.on('push-cart-data', (cartData) => {
      this.cartData = cartData
    })
  }
}
</script>
