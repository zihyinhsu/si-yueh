/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <LoadingView class="loading" :active="isLoading">
    <img src="../../assets/images/loading.gif" alt="Loading">
  </LoadingView>
  <div class="bg-light window-height">
    <div class="container">
      <!-- 搜尋欄 -->
      <div class="row py-6 py-md-7">
        <div class="col d-flex flex-column flex-md-row justify-content-md-between">
          <form class="autocomplete-container position-relative w-100 mb-4 mb-md-0" >
            <div class="input-group w-md-50 me-2">
              <input class="form-control" type="search" v-model.trim="search" @keyup="keyboardEvent"
              placeholder="輸入書籍、作者名稱" aria-label="Search" aria-describedby="button-addon2">
              <button class="btn btn-primary" type="submit" id="button-addon2" @click="searchProducts" :class="{'disabled': search===''}">
                <i class="fa-solid fa-magnifying-glass text-white"></i>
              </button>
            </div>
            <ul class="autoComplete position-absolute box-shadow bg-white w-100 w-md-50 z-index-3"
              :class=" autoComplete ? '' : 'd-none'">
              <li class="listHover p-2 w-100" v-for="(item,i) in filterProducts" :key="item.id"
                :class=" selectedIndex === i ?'bg-light': ''">
                <router-link class="text-dark d-inline-block w-100" :to="`/product/${item.id}`">{{ item.title }}
                </router-link>
              </li>
            </ul>
          </form>
          <form class="select position-relative" @click="this.selectShow = !this.selectShow">
            <div class="input d-flex align-items-center border border-dark cursor-pointer">
              <input class="form-control border-none cursor-pointer box-shadow-none" type="text" v-model="selectOption" placeholder="簡易篩選" readonly>
              <span class="px-2 text-dark">▼</span>
            </div>
            <ul class="selectList position-absolute box-shadow bg-white w-100 z-index-2" v-if="selectShow">
              <li class="listHover p-2" v-for="(item,i) in selectList" :key="i" @click="getSelectValue(item)">{{ item.option }}</li>
            </ul>
          </form>
        </div>
      </div>
      <!-- mainContent -->
      <div class="row" :class="{'vh-md-60':products.length <= 1}">
        <!-- sideBar -->
        <div class="col-md-3 mb-5 mb-md-0">
          <div class="position-sticky top-20">
            <div class="accordion" id="accordion" >
              <div class="accordion-item border-0">
                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                  <button class="accordion-button text-white bg-primaryDark fs-4 fs-md-3 fw-bold px-3 py-4 px-md-4 py-md-5"
                  type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne">類別</button>
                </h2>
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                  <div class="accordion-body p-0">
                    <ul class="list-group list-group-flush fw-bold cursor-pointer">
                      <!-- 用以判斷點擊的li哪個為active，並將同排的li之active樣式歸零 -->
                      <li class="list-group-item"
                        :class="isActive === 'all' ? 'active' : ''"
                        @click="getProducts(), (isActive = 'all'), accordionCollapseBack()"
                      >全部 ({{ productsAll.length }})</li>
                      <li class="list-group-item cateList" v-for="(item, i) in filterCategory" :key="i"
                      :class="isActive === item ? 'active' : ''"
                        @click="getProducts(item),(isActive = item), accordionCollapseBack()" >{{ item }} ({{ filterCateNum[item] }})</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- content -->
        <div class="col-md-9">
          <ul :class="{'vh-50':products.length === 1}">
            <p class="fs-3 fw-bold vh-40 vh-md-50 py-4 w-100" v-if="products.length === 0">沒有相符的搜尋結果 Σ( ° △ °)</p>
            <li class="bg-white mb-4 mb-md-8 hoverBoxShadow" v-for="item in products" :key="item.id"
              :class="products.length === 0 ? 'd-none' : ''">
              <div class=" d-flex align-items-center w-100 p-3 p-md-5 h-100">
                <router-link class="text-primary me-4 me-md-5 w-42.5 w-md-30" :to="`/product/${item.id}`">
                  <img class="ratio ratio-3x4 rounded-4" :src="item.imageUrl" :alt="item.title">
                </router-link>
                <div class="bookIntro border-end-md pe-md-1 w-57.5 w-md-45 me-md-4">
                  <p class="fw-bold fs-md-4 mb-1 mb-md-2">{{ item.title }}</p>
                  <p class="fs-small fs-md-5 mb-1 mb-md-2">作者 : {{ item.author }}</p>
                  <p class="fs-small fs-md-5 mb-1 mb-md-2">出版社 : {{ item.publishing_house }}</p>
                  <p class="fs-small fs-md-5 mb-1 mb-md-2">出版日期 : {{ item.publication_date }}</p>
                  <p class="fs-md-3 fw-bold text-primary mb-1 mb-md-2">NT$ {{ item.price }}</p>
                  <div class="btn btn-primary text-white w-md-auto fs-small fs-md-5" @click="addToCart(item)">
                    <i class="fa-solid fa-cart-plus me-3"></i>加入購書車<span v-show="isLoadingItem === item.id"><i class="fas fa-spinner fa-pulse ms-1"></i></span>
                  </div>
                </div>
                <div class="bookContent w-55 d-none d-md-block">
                  <p v-html="item.content"></p>
                  <div class="text-end mt-2">
                    <router-link class="text-primary w-100" :to="`/product/${item.id}`">繼續閱讀</router-link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!-- pagination -->
          <PagiNation class="d-flex justify-content-center mb-4 mb-md-6"
            :pages="pagination" @update-page="getProducts"
            v-if="products.length !== 0"></PagiNation>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PagiNation from '@/components/front/PagiNation'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'

export default {
  data () {
    return {
      products: [],
      productsAll: [],
      pagination: {
        category: ''
      },
      isActive: 'all',
      isLoading: '',
      selectedIndex: -1,
      search: '',
      autoComplete: false,
      selectValue: '',
      selectOption: '',
      selectList: [
        {
          option: '年份 : 由新到舊',
          value: 'publication_date'
        },
        {
          option: '價格 : 由高至低',
          value: 'price'
        }
      ],
      selectShow: false
    }
  },
  components: {
    PagiNation
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(statusStore, ['pushMsg']),
    getProducts (category, page = 1) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`
      if (category) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${category}&page=${page}`
      }
      this.isLoading = true
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
          this.selectOption = ''
          this.search = ''
          this.selectValue = ''
        }).catch(() => {
          this.isLoading = false
        })
    },
    getAllProducts () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.productsAll = res.data.products
        }).catch(() => {
          this.pushMsg(false, '載入', '請重新整理')
        })
    },
    // 判斷當螢幕為手機版時，點擊選單自動收合
    accordionCollapseBack () {
      if (window.matchMedia('(max-width: 767px)').matches) {
        const accordionButton = document.querySelector('.accordion-button')
        accordionButton.click()
      }
    },
    sortByDate () {
      if (this.selectValue) {
        this.products.sort((a, b) => b[this.selectValue] > a[this.selectValue] ? 1 : -1)
      }
    },
    searchProducts () {
      this.products = this.filterProducts
      this.autoComplete = false
    },
    keyboardEvent (e) {
      // 按鈕向上
      if (e.keyCode === 38) {
        this.selectedIndex--
      // 按鈕向下
      } else if (e.keyCode === 40) {
        this.selectedIndex++
        // enter
      } else if (e.keyCode === 13) {
        this.filterProducts.forEach((item, i) => {
          if (this.selectedIndex === i) {
            this.search = item.title
            this.searchProducts()
          }
        })
      }
    },
    getSelectValue (item) {
      this.selectOption = item.option
      this.selectValue = item.value
    }
  },
  watch: {
    search () {
      if (this.search) {
        this.autoComplete = true
        this.pagination.current_page = 1
        this.pagination.total_pages = 1
        this.pagination.has_next = false
      } else {
        this.autoComplete = false
      }
    },
    selectValue: {
      handler () {
        this.sortByDate()
      },
      deep: true
    },
    products () {
      if (this.products.length <= 1) {
        this.autoComplete = false
      }
      this.products.forEach(item => { item.publication_date = item.publication_date.split('-').join('/') }
      )
    }
  },
  // 搜尋功能
  computed: {
    ...mapState(cartStore, ['cartData']),
    ...mapState(statusStore, ['isLoadingItem']),
    filterProducts () {
      const strArr = this.search.split(' ') // 以空白格切分字串
      const arr = []
      // 比對字串
      strArr.forEach((str) => {
        this.productsAll.forEach((item) => {
          if (item.title.includes(str) || item.author.includes(str)) {
            arr.push(item)
          }
        })
      })
      // 如果輸入兩個關鍵字就會出現重複的資料，所以需要刪除重複資料。
      // 過濾出重複的元素
      return [...new Set(arr)]
    },
    filterCategory () {
      // 提取出category
      const array = this.productsAll.map((item) => item.category)
      // 過濾出重複的元素
      return [...new Set(array)]
    },
    filterCateNum () {
      // 取出每個category的數量
      const cateNum = {}
      this.productsAll.forEach((item) => {
        if (!cateNum[item.category]) {
          cateNum[item.category] = 1
        } else {
          cateNum[item.category] += 1
        }
      })
      return cateNum
    }
  },
  mounted () {
    this.getAllProducts()
    this.getProducts()
    // 利用localStorage取得資料
    setTimeout(() => {
      const category = localStorage.getItem('category')
      const isActive = localStorage.getItem('isActive') || 'all'
      if (category) {
        this.isActive = isActive
        this.getProducts(category)
        localStorage.removeItem('category')
        localStorage.removeItem('isActive')
      }
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.listHover{
  &:hover{
    background-color: #FAF9F9;
    cursor: pointer;
  }
}
.border-none{
  border: none;
}
</style>
