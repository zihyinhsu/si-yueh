// 匯入 defineStore 的方法
import { defineStore } from 'pinia'
// 這裡帶入兩個參數，一個是store 名稱、另一個是屬性參數
export default defineStore('goAnchor', {
  state: () => ({
    anchorActive: false
  }),
  // 對應 methods (物件形式)
  actions: {
    clickAnchor () {
      this.$router.push('/')
      this.anchorActive = true
      this.goAnchor()
    },
    goAnchor () {
      this.anchorActive = false
      setTimeout(() => {
        const anchor = document.querySelector('#cta')
        document.documentElement.scrollTop = anchor.offsetTop - 150
      }, 800)
    }
  }
})
