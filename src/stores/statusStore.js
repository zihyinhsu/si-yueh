// 匯入 defineStore 的方法
import { defineStore } from 'pinia'

// 這裡帶入兩個參數，一個是store 名稱、另一個是屬性參數
export default defineStore('statusStore', {
  // 對應 data
  state: () => ({
    isLoadingItem: false || '',
    isLoading: false,
    isBounced: false,
    messages: [],
    message: {}
  }),
  // 對應 methods (物件形式)
  actions: {
    loadingEffect () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    loadingItemEffect () {
      this.isLoadingItem = true
      setTimeout(() => {
        this.isLoadingItem = false
      }, 1000)
    },
    toastShow () {
      setTimeout(() => {
        this.messages.shift()
      }, 1500)
    },
    clearToast (index) {
      this.messages.splice(index, 1)
    },
    pushMsg (res = true, title = '更新', content) {
      if (res) {
        this.message = {
          style: 'primary',
          title: `${title}成功`,
          content: content,
          icon: 'fa-circle-check'
        }
      } else {
        this.message = {
          style: 'danger',
          title: `${title}失敗`,
          content: content,
          icon: 'fa-circle-xmark'
        }
      }
      this.statusMsg(this.message)
    },
    statusMsg (message) {
      const { style, title, content, icon } = message
      this.messages.push({ style, title, content, icon })
      this.toastShow()
    }
  }
})
