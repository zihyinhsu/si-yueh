<template>
  <div class="modal fade" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content background-transparent">
        <div class="modal-header bg-primary text-center p-3">
          <h4 class="modal-title text-white">訂單編號 : {{ tempModalData.id }}</h4>
          <select class="form-select form-select-sm bg-light box-shadow-none w-auto"
            v-model="tempModalData.orderStatus">
            <option selected value =''>配送進度</option>
            <option value='已收到訂單'>已收到訂單</option>
            <option value='準備出貨中'>準備出貨中</option>
            <option value='包裹已送達物流中心，正在理貨中'>包裹已送達物流中心，正在理貨中</option>
            <option value='包裹進行配送中'>包裹進行配送中</option>
            <option value='商品已送達指定地點，請前去領取'>商品已送達指定地點，請前去領取</option>
          </select>
        </div>
        <div class="modal-body bg-white text-center p-6">
          <div class="row">
            <div class="col-5">
              <div class="position-sticky top-20">
                <div class="d-flex justify-content-between align-items-center mb-5">
                  <p class="bg-light text-primary fw-bold fs-3 p-2"># 用戶資訊</p>
                  <div class="d-flex">
                    <span class="text-secondary fw-bold me-2" v-if="tempModalData.is_paid">已付款</span>
                    <span class="text-secondary fw-bold me-2" v-else>未付款</span>
                    <!-- ToggleSwitch -->
                    <label class="switch">
                    <input type="checkbox"
                    v-model="tempModalData.is_paid">
                    <span class="slider"></span>
                    </label>
                    <!-- ToggleSwitch -->
                  </div>
                </div>
                <!-- 訂單資料 -->
                <table class="table table-sm">
                  <tbody>
                    <tr class="text-start">
                      <th class="text-secondaryDark" scope="row">下單時間</th>
                      <td class="text-secondaryDark">{{ this.$filters.date(tempModalData.create_at) }}</td>
                    </tr>
                    <tr class="text-start">
                      <th class="text-secondaryDark" scope="row">Email</th>
                      <td class="text-secondaryDark">{{ tempModalData.user?.email }}</td>
                    </tr>
                    <tr class="text-start">
                      <th class="text-secondaryDark" scope="row">收件人姓名</th>
                      <td class="text-secondaryDark">{{ tempModalData.user?.name }}</td>
                    </tr>
                    <tr class="text-start">
                      <th class="text-secondaryDark" scope="row">電話號碼</th>
                      <td class="text-secondaryDark">{{ tempModalData.user?.tel }}</td>
                    </tr>
                    <tr class="text-start">
                      <th class="text-secondaryDark" scope="row">收件地址</th>
                      <td class="text-secondaryDark">{{ tempModalData.user?.address }}</td>
                    </tr>
                    <tr class="text-start" v-if="tempModalData.user?.payment">
                      <th class="text-secondaryDark" scope="row">付款方式</th>
                      <td class="text-secondaryDark">{{ tempModalData.user?.payment }}</td>
                    </tr>
                    <tr class="text-start" v-if="tempModalData.message">
                      <th class="text-secondaryDark" scope="row">備註</th>
                      <td class="text-secondaryDark">{{ tempModalData.message }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- 訂單內容 -->
            <div class="col-6 offset-1">
              <div class="d-flex mb-4">
                <p class="bg-light text-primary fw-bold fs-3 p-2"># 訂單內容</p>
              </div>
              <ul>
                <li class="d-flex justify-content-between align-items-center py-2" v-for="item in tempModalData.products" :key="item.id">
                <div class="d-flex align-items-center">
                <img class="ratio ratio-3x4 rounded-4 w-15 me-4" :src="item.product.imageUrl" :alt="item.product.title">
                <div class="cart-body text-start">
                  <p class="fw-bold">{{ item.product.title }}</p>
                  <p class="fw-bold">{{ item.product.author }}</p>
                  <p class="fw-bold text-primaryDark">NT$ {{ Math.round(item.final_total) }}</p>
                  <p class="text-danger fw-bold" v-if="item.coupon">已套用優惠券</p>
                </div>
                </div>
                <p class="w-25 w-md-20">x {{ item.qty }}</p>
                </li>
              </ul>
              <p class="fs-4 fw-bold text-end"> 總計金額:NT${{ Math.round(tempModalData.total) }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0 bg-white flex-nowrap w-100">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary text-white" @click="$emit('update-orders',tempModalData)">修改付款狀態</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  mixins: [modalMixin],
  watch: {
    temp: {
      handler () {
        if (!this.tempModalData.orderStatus) {
          this.tempModalData.orderStatus = '已收到訂單'
        }
      },
      deep: true
    }
  }
}
</script>
