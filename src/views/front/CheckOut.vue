<template>
  <LoadingView class="loading" :active="isLoading">
    <img src="../../assets/images/loading.gif" alt="Loading">
  </LoadingView>
  <div class="bg-light">
    <OrderNav :orderId="order"></OrderNav>
    <div class="container pt-4 pb-5 pb-md-9">
      <div class="row justify-content-center">
        <div class="col-md-4 mb-6 mb-md-0">
          <div class="position-sticky top-20">
            <!-- 訂單編號 -->
             <div class="mb-8">
                <div class="d-flex mb-4">
                  <p class="bg-white text-primary fw-bold fs-4 fs-md-3 p-2"># 訂單編號</p>
                </div>
                <p class="fs-small text-danger mb-2">請記得複製以保存您的訂單編號，便於查找訂單狀態</p>
                <div class="d-flex flex-column flex-md-row justify-content-md-between align-items-center">
                  <p ref="orderId" class="fs-5 fw-bold text-primaryDark mb-2 mb-md-0">{{ order.id }}</p>
                <div class="btn btn btn-primary w-100 w-md-auto text-white fs-small" @click="copyOrderId(order.id)"> 複製訂單編號</div>
              </div>
            </div>
            <!-- 訂單內容 -->
            <div class="d-flex mb-4">
              <p class="bg-white text-primary fw-bold fs-4 fs-md-3 p-2"># 訂單內容</p>
            </div>
            <ul>
              <li class="d-flex justify-content-between align-items-center border-bottom-1 mb-4" v-for="item in order.products" :key="item.id">
                <div class="d-flex align-items-center w-90 p-3">
                  <img class="ratio ratio-3x4 rounded-4 w-20 me-4" :src="item.product.imageUrl" :alt="item.product.title">
                  <div class="cart-body text-start ">
                    <p class="fw-bold">{{ item.product.title }}</p>
                    <p class="fw-bold">{{ item.product.author }}</p>
                    <p class="fw-bold text-primaryDark">NT$ {{ item.product.price }}</p>
                    <p class="text-danger fw-bold" v-if="item.coupon">已套用優惠券</p>
                  </div>
                </div>
                <p class="w-10">x {{ item.qty }}</p>
              </li>
            </ul>
             <!-- 小計 -->
            <div>
              <p class="text-secondaryDark fw-bold text-end mb-3 fs-md-4">
                總計金額 : NT${{ Math.round(order.total) }}
              </p>
            </div>
          </div>
        </div>
        <!-- 收件人資料 -->
        <div class="col-md-5 offset-md-1">
            <form class="bg-white p-4 p-md-8">
              <h2 class="bg-light category fs-4 fs-md-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"># 收件人資料</h2>
                  <div class="mb-3">
                    <label for="email" class="form-label fw-bold">Email<span class="text-danger">*</span></label>
                    <input id="email" name="email" type="email" class="form-control border-0" :value="order.user.email" disabled>
                  </div>
                  <div class="d-flex">
                    <div class="mb-3 me-4">
                        <label for="name" class="form-label fw-bold">收件人姓名<span class="text-danger">*</span></label>
                        <input id="name" name="姓名" type="text" class="form-control border-0" :value="order.user.name" disabled>
                      </div>
                      <div class="mb-3">
                        <label for="tel" class="form-label fw-bold">收件人電話<span class="text-danger">*</span></label>
                        <input id="tel" name="電話" type="text" class="form-control border-0" :value="order.user.tel" disabled>
                      </div>
                  </div>
                  <div class="mb-3">
                    <label for="address" class="form-label fw-bold">收件人地址<span class="text-danger">*</span></label>
                    <input id="address" name="地址" type="text" class="form-control border-0" :value="order.user.address" disabled>
                  </div>
                  <div class="mb-3">
                    <label for="payment" class="form-label fw-bold">付款方式<span class="text-danger">*</span></label>
                    <input id="payment" name="付款方式" type="text" class="form-control border-0" :value="order.user.payment" disabled>
                  </div>
                  <div class="mb-3">
                    <label for="message" class="form-label fw-bold">備註</label>
                    <textarea id="message" class="form-control min-h-25 border-0" :value="order.message" disabled></textarea>
                  </div>
                  <div class="text-end">
                    <button type="submit" class="btn btn-primary text-white w-100"
                    @click.prevent="pay">確認付款</button>
                  </div>
            </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
import OrderNav from '@/components/front/OrderNav'

export default {
  data () {
    return {
      order: {
        user: {},
        products: {}
      },
      orderProducts: [],
      orderId: this.$route.params.id,
      isLoading: false
    }
  },
  components: {
    OrderNav
  },
  methods: {
    ...mapActions(statusStore, ['pushMsg']),
    getOrders (id) {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`)
        .then((res) => {
          this.order = res.data.order
          // 物件轉成陣列
          this.orderProducts = Object.keys(this.order.products).map((i) => this.order.products[i])
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
    },
    pay () {
      this.isLoading = true
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`)
        .then((res) => {
          this.isLoading = false
          this.pushMsg(res, '更新', '已付款成功')
          // 頁面跳轉
          this.$router.push('/payment')
        })
    },
    copyOrderId (text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          this.pushMsg(true, '複製', '您已成功複製優惠碼!')
        })
    }
  },
  mounted () {
    this.getOrders(this.orderId)
  }
}
</script>

<style lang="scss" scoped>
.min-h-25{
  min-height:100px;
}
</style>
