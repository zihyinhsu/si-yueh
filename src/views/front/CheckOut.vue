<template>
    <LoadingView :active="isLoading">
    <img src="../../assets/images/loading.gif" style="height:200px;width:200px">
  </LoadingView>
  <div class="bg-light">
    <OrderNav :orderId="order"></OrderNav>
    <div class="container pt-4 pb-5 pb-md-9">
      <div class="row justify-content-center">
        <div class="col-md-4 mb-6 mb-md-0">
          <div class="position-sticky top-15">
            <!-- 訂單編號 -->
             <div class="mb-8">
              <div class="d-flex mb-4">
                <p class="bg-white text-primary fw-bold fs-3 p-2"># 訂單編號</p>
              </div>
              <p class="fs-4 fw-bold text-primaryDark">{{order.id}}</p>
            </div>
            <!-- 訂單內容 -->
            <div class="d-flex mb-4">
              <p class="bg-white text-primary fw-bold fs-3 p-2"># 訂單內容</p>
            </div>
            <ul>
                <li class="d-flex justify-content-between align-items-center border-bottom-1 mb-4" v-for="item in order.products" :key="item.id">
                    <div class="d-flex align-items-center">
                        <img class="ratio ratio-3x4 rounded-4 me-4" :src="item.product.imageUrl" :alt="item.product.title" style="width:60px;">
                        <div class="cart-body text-start ">
                            <p class="fw-bold">{{item.product.title}}</p>
                            <p class="fw-bold">{{item.product.author}}</p>
                            <p class="fw-bold text-primaryDark">NT$ {{item.product.price}}</p>
                        </div>
                    </div>
                    <p class="w-10">x {{item.qty}}</p>
                </li>
                <!-- 小計 -->
                  <div>
                      <p class="text-secondaryDark fw-bold text-end mb-3 fs-md-4">
                        總計金額 : NT${{Math.round(order.total)}}
                      </p>
                  </div>
            </ul>
          </div>
        </div>
        <!-- 收件人資料 -->
        <div class="col-md-5 offset-md-1">
            <form class="bg-white p-4 p-md-8">
              <h2 class="bg-light category fs-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"># 收件人資料</h2>
                  <div class="mb-3">
                    <label for="email" class="form-label fw-bold">Email<span class="text-danger">*</span></label>
                    <input id="email" name="email" type="email" class="form-control" :value="order.user.email" readonly>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3">
                        <label for="name" class="form-label fw-bold">收件人姓名<span class="text-danger">*</span></label>
                        <input id="name" name="姓名" type="text" class="form-control" :value="order.user.name" readonly>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3">
                        <label for="tel" class="form-label fw-bold">收件人電話<span class="text-danger">*</span></label>
                        <input id="tel" name="電話" type="text" class="form-control" :value="order.user.tel" readonly>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="address" class="form-label fw-bold">收件人地址<span class="text-danger">*</span></label>
                    <input id="address" name="地址" type="text" class="form-control" :value="order.user.address" readonly>
                  </div>

                  <div class="mb-3">
                    <label for="payment" class="form-label fw-bold">付款方式<span class="text-danger">*</span></label>
                    <input id="payment" name="付款方式" type="text" class="form-control" :value="order.user.payment" readonly>
                  </div>

                  <div class="mb-3">
                    <label for="message" class="form-label fw-bold">備註</label>
                    <textarea id="message" class="form-control" :value="order.message" style="min-height:100px; !important" readonly></textarea>
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
import OrderNav from '@/components/front/OrderNav'

export default {
  data () {
    return {
      productsAll: {},
      order: {
        user: {},
        products: {}
      },
      orderProducts: [],
      orderId: '',
      isLoading: false
    }
  },
  components: {
    OrderNav
  },
  methods: {
    getOrders () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`)
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
          this.$StatusMsg(res, '更新', '已付款成功')
          // 頁面跳轉
          this.$router.push('/payment')
        })
    },
    getProductsAll () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.productsAll = res.data.products
          this.isLoading = false
        }).catch((err) => {
          console.dir(err)
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.orderId = this.$route.params.id
    this.getOrders()
    this.getProductsAll()
  }
}
</script>
