<template>
<LoadingView :active="isLoading">
  <img src="../../assets/images/loading.gif" style="height:200px;width:200px">
</LoadingView>
    <div class="d-flex mb-4">
        <h2 class="category bg-white text-primaryDark fw-bold fs-3 me-4 p-2"># 後台訂單管理</h2>
    </div>
      <table class="table caption-top table-hover  text-primaryDark">
        <thead>
          <tr>
            <th class="fw-bold" scope="col">購買時間</th>
            <th scope="col">Email</th>
            <th scope="col">購買款項</th>
            <th scope="col">應付金額</th>
            <th scope="col">是否付款</th>
            <th scope="col">編輯/刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td >{{date(item.create_at)}}</td>
            <td>{{item.user.email}}</td>
            <td>
                <ul class="list-unstyled">
                    <li v-for="(product,i) in item.products" :key="i">
                    <span class="fw-bold">{{product.product.title}}</span> / {{product.qty}} {{product.product.unit}}
                    </li>
                </ul>
            </td>
            <td>NT$ {{item.total}}</td>
            <td class="ps-5">
              <!-- ToggleSwitch -->
                    <label class="switch">
                      <input type="checkbox"
                      v-model="item.is_paid"
                      @change="updatePaid(item)">
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
      <!-- orderModal -->
      <OrderModal ref="orderModal" :temp="temp" @update-orders="updatePaid"></OrderModal>
      <!-- delModal -->
      <DelModal ref="delModal" :temp="temp" @del-item="delOrderItem"></DelModal>
      <!-- pagination -->
      <PagiNation class="d-flex justify-content-center"
                  :pages="pagination" @update-page="getOrders"></PagiNation>
</template>

<script>
import PagiNation from '@/components/front/PagiNation'
import OrderModal from '@/components/admin/OrderModal'
import DelModal from '@/components/admin/DelModal'
import { date } from '@/methods/filters.js'
export default {
  data () {
    return {
      temp: [],
      orders: [],
      pagination: [],
      isLoading: false
    }
  },
  components: {
    PagiNation,
    OrderModal,
    DelModal
  },
  methods: {
    date,
    getOrders (page = 1) {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
        }).catch((err) => {
          console.log(err)
          this.isLoading = false
        })
    },
    openModal (status, product) {
      if (status === 'edit') {
        this.temp = { ...product }
        this.$refs.orderModal.openModal()
      } else if (status === 'delete') {
        this.temp = { ...product }
        this.$refs.delModal.openModal()
      }
    },
    updatePaid (item) {
      this.temp = item
      this.isLoading = true
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`,
        { data: this.temp })
        .then((res) => {
          this.$StatusMsg(res, '更新', '已成功更新付款狀態')
          this.isLoading = false
          this.$refs.orderModal.hideModal()
          this.getOrders()
        }).catch((err) => {
          this.$StatusMsg(err.response, '更新', '更新付款狀態失敗')
          this.isLoading = false
        })
    },
    delOrderItem (item) {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`)
        .then((res) => {
          this.$StatusMsg(res, '更新', '已成功刪除訂單')
          this.isLoading = false
          this.$refs.delModal.hideModal()
          this.getOrders()
        }).catch((err) => {
          this.$StatusMsg(err.response, '更新', '刪除訂單失敗')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
