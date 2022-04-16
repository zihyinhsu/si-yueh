<template>
<LoadingView class="loading" :active="isLoading">
  <img src="../../assets/images/loading.gif" alt="Loading">
</LoadingView>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="header d-flex align-items-center">
            <h2 class="category bg-white text-primaryDark fw-bold fs-3 me-4 p-2"># 優惠券管理</h2>
        </div>
        <div class="btn btn-primary text-white" @click="openModal ('isCreateNew')">
          <i class="fa-solid fa-book-medical me-3"></i>新增優惠券
          </div>
    </div>
     <table class="table caption-top table-hover  text-primaryDark">
        <thead>
          <tr>
            <th class="fw-bold" scope="col">名稱</th>
            <th scope="col">折扣百分比</th>
            <th scope="col">到期日</th>
            <th scope="col">是否啟用</th>
            <th scope="col">編輯/刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }} %</td>
            <td>{{ $filters.date(item.due_date) }}</td>
            <td class="ps-5">
              <!-- ToggleSwitch -->
                    <label class="switch">
                      <input type="checkbox"
                      v-model="item.is_enabled"
                      @change="updateCoupon(item,false)"
                      :true-value="1" :false-value="0">
                      <span class="slider"></span>
                  </label>
                <!-- ToggleSwitch -->
            </td>
            <td>
             <div class="d-flex">
                  <div class="editBtn d-flex align-items-center" @click="openModal('edit',item)">
                <i class="fa-solid fa-pencil cursor-pointer text-primary fs-4 me-6"></i>
              </div>
              <div class="delBtn d-flex align-items-center" @click="openModal('delete',item)">
                <i class="fa-solid fa-trash cursor-pointer text-primary fs-4"></i>
              </div>
             </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- CouponModal -->
      <CouponModal ref="couponModal" :temp="temp" :isCreateNew="isCreateNew" @update-coupons="updateCoupon"></CouponModal>
      <!-- delModal -->
      <DelModal ref="delModal" :temp="temp" @del-item="delCouponItem"></DelModal>
</template>

<script>
import CouponModal from '@/components/admin/CouponModal'
import DelModal from '@/components/admin/DelModal'
export default {
  data () {
    return {
      temp: {},
      coupons: {},
      isCreateNew: true,
      isLoading: false
    }
  },
  components: {
    CouponModal,
    DelModal
  },
  methods: {
    getCoupons () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`)
        .then((res) => {
          this.coupons = res.data.coupons
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
    },
    openModal (status, product) {
      if (status === 'isCreateNew') {
        this.temp = {
          // 將時間格式改為 YYYY-MM-DD
          due_date: new Date().getTime() / 1000,
          is_enabled: 0
        }
        this.isCreateNew = true
        this.$refs.couponModal.openModal()
      } else if (status === 'edit') {
        this.temp = { ...product }
        this.isCreateNew = false
        this.$refs.couponModal.openModal()
      } else if (status === 'delete') {
        this.temp = { ...product }
        this.$refs.delModal.openModal()
      }
    },
    updateCoupon (item, isCreateNew) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`
      let method = 'post'
      // 如果是編輯模式
      if (isCreateNew === false) {
        method = 'put'
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
      }
      this.isLoading = true
      this.$http[method](url, { data: item })
        .then((res) => {
          this.isLoading = false
          this.$StatusMsg(res, '更新', '已成功更新優惠券')
          this.$refs.couponModal.hideModal()
          this.getCoupons()
        }).catch(() => {
          this.isLoading = false
          this.$StatusMsg(false, '更新', '更新優惠券失敗')
        })
    },
    delCouponItem (item) {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`)
        .then((res) => {
          this.$StatusMsg(res, '更新', '已成功刪除優惠券')
          this.isLoading = false
          this.$refs.delModal.hideModal()
          this.getCoupons()
        }).catch(() => {
          this.$StatusMsg(false, '更新', '刪除優惠券失敗')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
