<template>
  <LoadingView class="loading" :active="isLoading">
      <img src="../../assets/images/loading.gif" alt="Loading">
  </LoadingView>
  <div class="window-height bg-light">
    <div class="banner position-relative">
      <img class="w-100" src="https://cdn-news.readmoo.com/wp-content/uploads/2020/10/annelies-geneyn-bhBONc07WsI-unsplash.jpg" alt="Login">
       <div class="center d-flex flex-column justify-content-center w-45 w-md-auto">
          <p class="text-white text-shadow text-center fw-bold fs-4 fs-md-3 letter-md-spacing">我的收藏書單</p>
          <p class="markLine text-white text-shadow text-center fw-bold fs-small fs-md-5 mb-2 mb-md-4">直接拖曳可調整書單順序</p>
          <div class="btn btn-sm btn-light text-primaryDark fw-bold fs-md-5" @click="saveSort" v-if="perPageData.length > 1">儲存書單順序
            <span v-show="isLoadingItem">
              <i class="fas fa-spinner fa-pulse ms-1"></i>
            </span>
          </div>
      </div>
    </div>
    <div class="container position-relative bg-light mt-lg-n15 rounded-4 py-7 py-md-10">
      <!-- 如果收藏夾為空 -->
      <div class="row">
        <div class="col">
          <div class="d-flex flex-column align-items-center py-5" v-if="favorite.length===0">
            <i class="fa-solid fa-triangle-exclamation text-primaryDark fa-2x mb-3"></i>
            <p class="fw-bold mb-4">你的收藏書單還空空的呢 ~</p>
            <router-link class="btn btn-primaryDark" to="/search">查找書籍
            <i class="fa-solid fa-book-open-reader ms-2"></i></router-link>
          </div>
        </div>
      </div>
      <div class="row row-cols-2 row-cols-md-5 px-md-3">
        <draggable v-model="perPageData" tag="transition-group" item-key="id">
          <template #item="{element}">
            <div class="col d-flex flex-column pb-7 pb-md-10">
              <div class="collectionImg position-relative rounded-4 overflow-hidden mb-3 hoverBoxShadow hoverCard">
                <router-link class="bookHover fadeIn" :to="`/product/${element.id}`">
                  <img class="ratio ratio-3x4" :src="element.imageUrl" :alt="element.title">
                </router-link>
                <div class="btn btn-primary position-absolute bottom-0 w-100 text-white fs-small fs-md-5"
                @click="addToCart(element)">
                  <i class="fa-solid fa-cart-plus me-3"></i>加入購書車 <span v-show="isLoadingItem === element.id">
                  <i class="fas fa-spinner fa-pulse ms-1"></i></span>
                </div>
                <div class="bookMark btn btn-sm position-absolute top-0 end-0 rounded-circle m-2"
                @click="toggleFavorite(element)" :class="favorite.includes(element) ? 'btn-primaryDark':'btn-primaryLight'">
                  <span class="material-icons-outlined text-white fs-5 mt-1" v-if="favorite.includes(element)">bookmark</span>
                  <span class="material-icons-outlined text-white fs-5 mt-1" v-else>bookmark_border</span>
                </div>
              </div>
              <div class="flex-grow-1">
                <router-link class="text-primaryDark d-block fw-bold text-truncate fs-4" :to="`/product/${element.id}`">{{ element.title }}</router-link>
                <p>{{ element.author }}</p>
              </div>
              <p class="text-primary fw-bold fs-3">NT$ {{ element.price }}</p>
            </div>
          </template>
        </draggable>
      </div>
      <PagiNation class="d-flex justify-content-center"
        :pages="pagination" @update-page="getProducts" v-if="favorite.length !== 0"></PagiNation>
    </div>
  </div>
</template>

<script>
import collectionMixin from '@/mixins/collectionMixin'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'

import PagiNation from '@/components/front/PagiNation'
import draggable from 'vuedraggable'

export default {
  mixins: [collectionMixin],
  data () {
    return {
      pagination: {},
      perPageData: [],
      perPageDataId: []
    }
  },
  components: {
    PagiNation,
    draggable
  },
  computed: {
    ...mapState(cartStore, ['cartData']),
    ...mapState(statusStore, ['isLoadingItem', 'isLoadingItem', 'isLoading'])
  },
  watch: {
    favorite: {
      handler () {
        this.getProducts()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(statusStore, ['loadingEffect', 'loadingItemEffect', 'pushMsg']),
    getProducts (cate = null, page = 1) {
      const perPage = 10 // 每頁要顯示的筆數
      this.pagination = {
        total_pages: Math.ceil(this.favorite.length / perPage),
        current_page: page,
        has_pre: false,
        has_next: false,
        maxItem: page * perPage, // 每頁最大筆數
        minItem: page * perPage - perPage + 1 // 每頁最小筆數
      }
      this.perPageData = [] // 每次換頁清空單頁資料
      this.favorite.forEach((item, index) => {
        const num = index + 1 // 最小資料筆數為1
        if (num >= this.pagination.minItem && num <= this.pagination.maxItem) {
          this.perPageData.push(item)
          this.perPageDataId = this.perPageData.map(item => item.id)
        }
      })
      if (page > 1) {
        this.pagination.has_pre = true
      }
      if (page < this.pagination.total_pages) {
        this.pagination.has_next = true
      }
    },
    saveSort () {
      // 每頁第一個品項的index
      let favIndex = this.pagination.minItem - 1
      // 刪掉this.favorite中與perPageData相符的品項
      this.favorite.forEach((favItem) => {
        this.perPageData.forEach((perPageItem) => {
          if (favItem.id === perPageItem.id) {
            this.favorite.splice(favIndex, this.perPageData.length)
            this.favoriteId.splice(favIndex, this.perPageData.length)
          }
        })
      })
      // 重新在原位置推進更改排序後的perPageData
      this.perPageData.forEach(item => {
        this.favorite.splice(favIndex, 0, item)
        this.favoriteId.splice(favIndex, 0, item.id)
        favIndex += 1
      })
      this.pushMsg(true, '儲存', '成功儲存書單順序!')
      this.loadingItemEffect()
    }
  },
  mounted () {
    this.loadingEffect()
    this.getProducts()
  }
}
</script>
