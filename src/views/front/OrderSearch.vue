<template>
<LoadingView class="loading" :active="isLoading">
    <img src="../../assets/images/loading.gif" alt="Loading">
</LoadingView>
<div class="window-height">
    <div class="container">
    <div class="row justify-content-center">
    <div class="col-md-6 py-6 py-md-10">
        <div class="input-group me-2">
            <input class="form-control" type="search" v-model.lazy.trim="search"
            placeholder="請輸入訂單編號" aria-label="Search" aria-describedby="button-addon2">
            <button class="btn btn-primary" type="submit" id="button-addon2">
                <i class="fa-solid fa-magnifying-glass text-white"></i>
            </button>
        </div>
    </div>
</div>
</div>

<div class="container">
    <div class="d-flex flex-column justify-content-center min-h-50vh py-5" v-if="!userOrder.id">
        <i class="fa-solid fa-triangle-exclamation text-primaryDark fa-2x mb-3"></i>
            <p class="text-center fw-bold mb-4">請記得輸入訂單編號喔 ~</p>
    </div>
    <div class="row justify-content-center" v-if="userOrder.id">
      <div class="col-md-6 bg-light py-2">
        <div class="d-flex flex-column align-items-center">
          <img class="moving" src="../../assets/images/truck.gif" alt="貨態追蹤">
          <p class="fw-bold text-secondaryDark">{{ userOrder.orderStatus }}</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center py-6 py-md-12" v-if="userOrder.id">
        <div class="col-md-9">
            <div class="row">
                <div class="col-md-5">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                            <p class="bg-light text-primary fw-bold fs-3 p-2"># 用戶資訊</p>
                            <div class="d-flex">
                                <span class="text-secondary fw-bold me-2" v-if="userOrder.is_paid">已付款</span>
                                <span class="text-secondary fw-bold me-2" v-else>未付款</span>
                                <!-- ToggleSwitch -->
                                <label class="switch">
                                <input type="checkbox"
                                v-model="userOrder.is_paid" disabled>
                                <span class="slider cursor-default"></span>
                            </label>
                            <!-- ToggleSwitch -->
                            </div>
                    </div>
                    <!-- 訂單資料 -->
                    <table class="table table-sm mb-5 mb-md-0">
                        <tbody>
                            <tr class="text-start">
                                <th class="text-secondaryDark" scope="row">下單時間</th>
                                <td class="text-secondaryDark">{{ $filters.date(userOrder.create_at) }}</td>
                            </tr>
                            <tr class="text-start">
                                <th class="text-secondaryDark" scope="row">Email</th>
                                <td class="text-secondaryDark">{{ userOrder.user.email }}</td>
                            </tr>
                            <tr class="text-start">
                                <th class="text-secondaryDark" scope="row">收件人姓名</th>
                                <td class="text-secondaryDark">{{ userOrder.user.name }}</td>
                            </tr>
                            <tr class="text-start">
                                <th class="text-secondaryDark" scope="row">電話號碼</th>
                                <td class="text-secondaryDark">{{ userOrder.user.tel }}</td>
                            </tr>
                            <tr class="text-start">
                                <th class="text-secondaryDark" scope="row">收件地址</th>
                                <td class="text-secondaryDark">{{ userOrder.user.address }}</td>
                            </tr>
                            <tr class="text-start" v-if="userOrder.user.payment">
                                <th class="text-secondaryDark" scope="row">付款方式</th>
                                <td class="text-secondaryDark">{{ userOrder.user.payment }}</td>
                            </tr>
                            <tr class="text-start" v-if="userOrder.message">
                                <th class="text-secondaryDark" scope="row">備註</th>
                                <td class="text-secondaryDark">{{ userOrder.message }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-6 offset-md-1">
                    <div class="d-flex mb-4">
                        <p class="bg-light text-primary fw-bold fs-3 p-2"># 訂單內容</p>
                    </div>
                    <ul >
                        <li class="d-flex justify-content-between align-items-center py-2 mb-4" v-for="item in userOrder.products" :key="item.id">
                            <div class="d-flex align-items-center w-90">
                                <img class="ratio ratio-3x4 rounded-4 w-15 me-4" :src="item.product.imageUrl" :alt="item.product.title">
                                <div class="cart-body text-start">
                                    <p class="fw-bold">{{ item.product.title }}</p>
                                    <p class="fw-bold">{{ item.product.author }}</p>
                                    <p class="fw-bold text-primaryDark">NT$ {{ Math.round(item.final_total) }}</p>
                                    <p class="text-danger fw-bold" v-if="item.coupon">已套用優惠券</p>
                                </div>
                            </div>
                            <p class="w-10">x {{ item.qty }}</p>
                        </li>
                        <p class="fs-4 fw-bold text-end"> 總計金額:NT${{ Math.round(userOrder.total) }}</p>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      userOrder: {
        user: {},
        products: {}
      },
      search: '',
      isLoading: false
    }
  },
  watch: {
    search: {
      handler () {
        if (this.search === '') {
          this.userOrder = {}
        } else {
          this.getOrders(this.search)
        }
      },
      deer: true
    }
  },
  methods: {
    getOrders (id) {
      if (this.search.length < 20 || !this.search.includes('-')) {
        this.$StatusMsg(false, '搜尋', '請重新搜尋')
      } else {
        this.isLoading = true
        this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`)
          .then((res) => {
            this.isLoading = false
            this.userOrder = res.data.order
            if (!this.userOrder.orderStatus) {
              this.userOrder.orderStatus = '已收到訂單'
            }
          }).catch(() => {
            this.isLoading = false
            this.$StatusMsg(false, '搜尋', '請重新搜尋')
          })
      }
    }
  }
}
</script>

<style lang="scss">
.table > :not(caption) > * > *{
  border-bottom-width: 0px;
}
.cursor-default{
  cursor: default;
}
.moving{
  width: 50px;
  height: 50px;
}
.min-h-50vh{
  min-height:50vh;
}
</style>
