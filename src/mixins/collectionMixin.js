import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
export default {
  data () {
    return {
      favorite: JSON.parse(localStorage.getItem('favorite')) || [],
      favoriteId: JSON.parse(localStorage.getItem('favoriteId')) || [],
      resentlyViewdProducts: JSON.parse(localStorage.getItem('resentlyViewdProducts')) || []
    }
  },
  watch: {
    // 用locolstorage自訂欄位並存取資料
    favorite: {
      handler () {
        // localStorage只接受字串
        localStorage.setItem('favorite', JSON.stringify(this.favorite))
      },
      deep: true
    },
    favoriteId: {
      handler () {
        localStorage.setItem('favoriteId', JSON.stringify(this.favoriteId))
      },
      deep: true
    },
    resentlyViewdProducts: {
      handler () {
        localStorage.setItem('resentlyViewdProducts', JSON.stringify(this.resentlyViewdProducts))
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(statusStore, ['pushMsg']),
    toggleFavorite (product) {
      const favoriteIndex = this.favorite.findIndex((item) => item.id === product.id)
      if (favoriteIndex === -1) {
        this.favorite.push(product)
        this.favoriteId.push(product.id)
        this.pushMsg(true, '收藏', '已成功收藏')
      } else {
        this.favorite.splice(favoriteIndex, 1)
        this.favoriteId.splice(favoriteIndex, 1)
        this.pushMsg(false, '收藏', '已取消收藏')
      }
    },
    resentlyViewed (product) {
      const resentlyViewdIndex = this.resentlyViewdProducts.findIndex((item) => item.id === product.id)

      if (this.resentlyViewdProducts.length >= 10) {
        // 如果總數量超過10，刪除陣列的第一筆資料
        this.resentlyViewdProducts.shift()
      }
      // 如果預覽到不同的書籍
      if (resentlyViewdIndex === -1) {
        this.resentlyViewdProducts.push(product)
      }
      // 如果預覽到重複的書籍
      if (resentlyViewdIndex !== -1) {
        // 先刪除重複的資料
        this.resentlyViewdProducts.splice(resentlyViewdIndex, 1)
        // 再重新推進最新的位置
        this.resentlyViewdProducts.push(product)
      }
    }
  }
}
