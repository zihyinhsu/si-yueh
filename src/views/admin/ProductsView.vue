<template>
    <div class="d-flex justify-content-between align-items-center mb-6">
        <div class="d-flex align-items-center">
            <h2 class="category bg-white fs-3 text-primaryDark p-2 fw-bold me-4"># 後台商品管理</h2>
            <select class="form-select form-select-sm bg-light w-auto" aria-label=".form-select-sm example" style="box-shadow:none"
            v-model="selectAnswer">
                <option selected value =''>全部</option>
                <option :value="item" v-for="(item,i) in category" :key="i">{{item}}</option>
            </select>
        </div>
        <div class="btn btn-primary text-white" @click="openModal ('isCreateNew', item)">
          <i class="fa-solid fa-book-medical me-3"></i>新增書籍</div>
    </div>
      <table class="table caption-top table-hover  text-primaryDark">
        <thead>
          <tr>
            <th class="fw-bold" scope="col">類別</th>
            <th scope="col">名稱</th>
            <th scope="col">原價</th>
            <th scope="col">售價</th>
            <th scope="col">是否上架</th>
            <th scope="col">編輯/刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <th scope="row">{{item.category}}</th>
            <td>{{item.title}}</td>
            <td>NT$ {{item.origin_price}}</td>
            <td>NT$ {{item.price}}</td>
            <td class="ps-5">
              <!-- ToggleSwitch -->
                    <label class="switch">
                      <input type="checkbox"
                      @change="updateProducts(item,false)"
                      v-model="item.is_enabled"
                      :true-value="1" :false-value="0">
                      <span class="slider"></span>
                  </label>
                <!-- ToggleSwitch -->
            </td>
            <td class="d-flex" style="height:41px">
              <div class="editBtn d-flex align-items-center h-100" @click="openModal ('edit', item)">
                <i class="fa-solid fa-pencil cursor-pointer text-primary fs-4 me-6"></i>
              </div>
              <div class="delBtn d-flex align-items-center h-100" @click="openModal ('delete', item)">
                <i class="fa-solid fa-trash cursor-pointer text-primary fs-4"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- productModal -->
      <ProductModal ref="productModal"
      :temp="temp" :isCreateNew="isCreateNew" @update-products="updateProducts"></ProductModal>
      <!-- delModal -->
      <DelModal ref="delModal" :temp="temp" @del-item="delProductItem"></DelModal>
      <!-- pagination -->
      <PagiNation class="d-flex justify-content-center mb-4 mb-md-6"
                  :pages="pagination"></PagiNation>
</template>

<script>
import PagiNation from '@/components/front/PagiNation'
import ProductModal from '@/components/admin/ProductModal'
import DelModal from '@/components/admin/DelModal'

export default {
  data () {
    return {
      temp: [],
      products: [],
      productsAll: [],
      category: [],
      pagination: [],
      selectAnswer: '',
      isCreateNew: false
    }
  },
  components: {
    PagiNation,
    ProductModal,
    DelModal
  },
  watch: {
    selectAnswer: {
      handler (value) {
        this.getProducts(value)
      },
      deep: true
    }
  },
  methods: {
    getProducts (category, page = 1) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/`
      if (category) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?category=${category}`
      } else if (page) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      }
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }).catch((err) => {
          console.log(err)
        })
    },
    getAllProducts () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`)
        .then((res) => {
          this.productsAll = res.data.products
          this.filterCategory()
        }).catch((err) => {
          console.log(err)
        })
    },
    filterCategory () {
      this.getAllProducts()
      // 將物件轉成陣列
      this.productsAll = Object.keys(this.productsAll).map((i) => this.productsAll[i])
      // 提取出category
      const array = this.productsAll.map((item) => item.category)
      // 過濾出重複的元素
      this.category = [...new Set(array)]
    },
    updateProducts (product, isCreateNew) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
      let method = 'post'
      console.log(method, isCreateNew)
      // 如果是編輯模式
      if (isCreateNew === false) {
        method = 'put'
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${product.id}`
      }
      this.$http[method](url, { data: product })
        .then((res) => {
          alert(res.data.message)
          this.$refs.productModal.hideModal()
          this.getProducts()
        }).catch((err) => {
          console.dir(err)
        })
    },
    openModal (status, product) {
      if (status === 'isCreateNew') {
        this.temp = {}
        this.$refs.productModal.openModal()
        this.isCreateNew = true
      } else if (status === 'edit') {
        this.temp = JSON.parse(JSON.stringify(product))
        this.$refs.productModal.openModal()
        this.isCreateNew = false
      } else if (status === 'delete') {
        this.temp = { ...product }
        this.$refs.delModal.openModal()
      }
    },
    delProductItem () {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.temp.id}`)
        .then((res) => {
          alert(res.data.message)
          this.$refs.delModal.hideModal()
          this.getProducts()
        }).catch((error) => {
          alert(error.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
    this.filterCategory()
  }
}
</script>
