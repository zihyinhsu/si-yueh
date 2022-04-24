<template>
  <LoadingView class="loading" :active="isLoading">
      <img src="../../assets/images/loading.gif" alt="Loading">
  </LoadingView>
  <div class="window-height">
    <div class="container pt-7">
      <!-- 如果收藏夾為空 -->
      <div class="d-flex flex-column align-items-center center py-5" v-if="favorite.length===0">
        <i class="fa-solid fa-triangle-exclamation text-primaryDark fa-2x mb-3"></i>
        <p class="fw-bold mb-4">收藏夾內還沒有商品呢 ~</p>
        <router-link class="btn btn-primaryDark" to="/search">查找書籍
        <i class="fa-solid fa-book-open-reader ms-2"></i></router-link>
      </div>
      <div class="row row-cols-2 row-cols-md-5">
        <div class="col d-flex flex-column mb-7 mb-md-10" v-for="item in favorite" :key="item.id">
          <div class="collectionImg position-relative rounded-4 overflow-hidden mb-3 hoverBoxShadow">
              <router-link class="bookHover fadeIn" :to="`/product/${item.id}`">
                <img class="ratio ratio-3x4" :src="item.imageUrl" :alt="item.title">
              </router-link>
              <div class="btn btn-primary position-absolute bottom-0 w-100 text-white fs-small fs-md-5"
              @click="addToCart(item)">
                <i class="fa-solid fa-cart-plus me-3"></i>加入購書車 <span v-show="isLoadingItem === item.id">
                <i class="fas fa-spinner fa-pulse ms-1"></i></span>
              </div>
              <div class="bookMark btn btn-sm position-absolute top-0 end-0 rounded-circle m-2"
              @click="toggleFavorite(item)" :class="favorite.includes(item) ? 'btn-primaryDark':'btn-primaryLight'">
                <span class="material-icons-outlined text-white fs-5 mt-1" v-if="favorite.includes(item)">bookmark</span>
                <span class="material-icons-outlined text-white fs-5 mt-1" v-else>bookmark_border</span>
              </div>
          </div>
          <div class="flex-grow-1">
            <router-link class="text-primaryDark d-block fw-bold text-truncate fs-4" :to="`/product/${item.id}`">{{ item.title }}</router-link>
            <p>{{ item.author }}</p>
          </div>
          <p class="text-primary fw-bold fs-3">NT$ {{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import collectionMixin from '@/mixins/collectionMixin'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import statusStore from '@/stores/statusStore'
export default {
  mixins: [collectionMixin],
  computed: {
    ...mapState(cartStore, ['cartData']),
    ...mapState(statusStore, ['isLoadingItem', 'isLoading'])
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(statusStore, ['loadingEffect'])
  },
  mounted () {
    this.loadingEffect()
  }
}
</script>
