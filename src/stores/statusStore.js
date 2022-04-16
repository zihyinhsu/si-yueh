// 匯入 defineStore 的方法
import { defineStore } from 'pinia'

// 這裡帶入兩個參數，一個是store 名稱、另一個是屬性參數
export default defineStore('statusStore', {
  // 對應 data
  state: () => ({
    isLoadingItem: '',
    isLoading: false,
    isBounced: false
  }),

  // 對應 computed (物件形式)
  getters: {

  },

  // 對應 methods (物件形式)
  actions: {
    loadingEffect () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    }
  }
})
