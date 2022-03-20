<template>
<div class="bg-light">
    <div class="container h-100 vh-md-auto">
        <!-- 搜尋欄 -->
        <div class="row py-6 py-md-7">
            <div class="col-md-6">
                  <div class="input-group">
                    <input class="form-control" type="search" v-model.lazy.trim="search"
                    placeholder="輸入書籍、作者名稱" aria-label="Search" aria-describedby="button-addon2">
                    <button class="btn btn-primary" type="submit" id="button-addon2">
                        <i class="fa-solid fa-magnifying-glass text-white"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- mainContent -->
        <div class="row">
            <!-- sideBar -->
            <div class="col-md-3 mb-5 mb-md-0 vh-md-70">
                <div class="accordion" id="accordion" >
                    <div class="accordion-item border-0">
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button text-white bg-primaryDark fs-4 fs-md-3 fw-bold px-3 py-4 px-md-4 py-md-5"
                        type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            類別
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body p-0">
                            <ul class="list-group list-group-flush fw-bold cursor-pointer">
                              <!-- 用以判斷點擊的li哪個為active，並將同排的li之active樣式歸零 -->
                                <li class="list-group-item"
                                    :class="isActive === 'all' ? 'active' : ''"
                                    @click="getProducts(), (isActive = 'all'), accordionCollapseBack()"
                                >全部</li>
                                <li class="list-group-item cateList" v-for="(item, i) in category" :key="i"
                                :class="isActive === item ? 'active' : ''"
                                 @click="getProducts(item), (isActive = item), accordionCollapseBack()" >{{item}}</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
            <!-- content -->
            <div class="col-md-9">
                <ul>
                  <p class="fs-3 fw-bold vh-70 vh-md-auto py-4 w-100" v-if="filterProducts.length === 0">沒有相符的搜尋結果 Σ( ° △ °)</p>
                    <li class="bg-white mb-4 mb-md-8 hoverBoxShadow" v-for="item in filterProducts" :key="item.id">
                        <div class=" d-flex align-items-center w-100 p-3 p-md-5 h-100">
                            <router-link class="text-primary me-4 me-md-5 w-45 w-md-30" :to="`/product/${item.id}`">
                                <img class="ratio ratio-4x3 rounded-4"
                                    :src="item.imageUrl" :alt="item.title">
                                </router-link>
                                <div class="bookIntro border-end-md pe-md-1 w-55 w-md-50 me-md-4">
                                    <p class="fw-bold fs-md-4 mb-2 mb-md-3">{{item.title}}</p>
                                    <p class="fs-small fs-md-5 mb-2 mb-md-3">作者 : {{item.author}}</p>
                                    <p class="fs-small fs-md-5 mb-2 mb-md-3">出版社 : {{item.publishing_house}}</p>
                                    <p class="fs-small fs-md-5 mb-2 mb-md-3">出版日期 : {{item.publication_date}}</p>
                                    <p class="fs-md-3 fw-bold text-primary mb-2 mb-md-3">NT$ {{item.price}}</p>
                                    <div class="btn btn-primary text-white w-100 w-md-auto" @click="addToCart(item.id)">
                                        <i class="fa-solid fa-cart-plus me-3"></i>加入購物車<span v-show="isLoadingItem === item.id"><i class="fas fa-spinner fa-pulse ms-1"></i></span>
                                    </div>
                                </div>
                                <hr>
                                <div class="bookContent w-50 d-none d-md-block">{{item.content}}
                                    <br>
                                    <div class="text-end">
                                        <router-link class="text-primary w-100" :to="`/product/${item.id}`">繼續閱讀</router-link>
                                    </div>

                                </div>
                        </div>
                    </li>
                </ul>
                 <!-- pagination -->
                  <PagiNation class="d-flex justify-content-center mb-4 mb-md-6"
                  :pages="pagination"></PagiNation>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import PagiNation from '@/components/front/PagiNation'
import emitter from '@/methods/emitter.js'

export default {
  data () {
    return {
      products: [],
      productsAll: [],
      category: [],
      pagination: [],
      isActive: 'all',
      isLoadingItem: '',
      search: ''
    }
  },
  components: {
    PagiNation
  },
  methods: {
    getProducts (category, page = 1) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
      if (category) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${category}`
      } else if (page) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`
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
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.productsAll = res.data.products
          this.filterCategory()
        }).catch((err) => {
          console.log(err)
        })
    },
    filterCategory () {
      this.getAllProducts()
      // 提取出category
      const array = this.productsAll.map((item) => item.category)
      // 過濾出重複的元素
      this.category = [...new Set(array)]
    },
    addToCart (id, qty = 1) {
      this.isLoadingItem = id
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
        data: {
          product_id: id,
          qty
        }
      }).then((res) => {
        emitter.emit('get-cart-list')
        alert(res.data.message)
        this.isLoadingItem = ''
      }).catch((err) => {
        alert(err)
      })
    },
    // 判斷當螢幕為手機版時，點擊選單自動收合
    accordionCollapseBack () {
      if (window.matchMedia('(max-width: 767px)').matches) {
        const accordionButton = document.querySelector('.accordion-button')
        accordionButton.click()
      }
    }
  },
  // 搜尋功能
  computed: {
    filterProducts () {
      return this.products.filter((item) => {
        const result = item.title.includes(this.search)
        return result
      })
    }
  },
  mounted () {
    this.getProducts()
    this.filterCategory()
  }
}
</script>
