// 匯入 defineStore 的方法
import axios from 'axios'
import { defineStore } from 'pinia'

import emitter from '@/methods/emitter.js'
import statusMsg from '@/methods/StatusMsg.js'

import _ from 'lodash'
import statusStore from './statusStore'
const status = statusStore()
// 這裡帶入兩個參數，一個是store 名稱、另一個是屬性參數
export default defineStore('cartStore', {
  // 對應 data
  state: () => ({
    cartData: {
      carts: []
    },
    coupon_code: ''
  }),

  // 對應 computed (物件形式)
  getters: {

  },

  // 對應 methods (物件形式)
  actions: {
    getCartList () {
      status.isBounced = true
      axios.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
          status.isBounced = false
        }).catch(() => {
          statusMsg(false, '載入', '請重新整理')
        })
    },
    updateCart (item, qty = 1) {
      if (item.qty <= 1) {
        item.qty = 1
      } else if (item.qty >= item.product.inventory) {
        item.qty = item.product.inventory
      }
      axios.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, {
        data: {
          product_id: item.product.id,
          qty: Number(item.qty)
        }
      })
        .then((res) => {
          emitter.emit('get-cart-list')
          statusMsg(res, '更新', '已成功更新購書車')
        }).catch(() => {
          statusMsg(false, '更新', '更新購書車失敗')
        })
    },
    delCartItem (item) {
      axios.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`)
        .then((res) => {
          emitter.emit('get-cart-list')
          statusMsg(res, '刪除', '已成功刪除品項')
        }).catch(() => {
          statusMsg(false, '刪除', '刪除品項失敗')
        })
    },
    delAllCart (item) {
      status.isLoadingItem = item.id
      axios.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          status.isLoadingItem = ''
          emitter.emit('get-cart-list')
          statusMsg(res, '刪除', '已成功刪除所有品項')
        }).catch(() => {
          status.isLoadingItem = ''
          statusMsg(false, '刪除', '刪除所有品項失敗')
        })
    },
    addToCart: _.debounce(function (product, qty = 1) {
      // 如果選擇的數量>=庫存就return
      status.isLoadingItem = product.id
      // 篩選出cartData與指定商品中id相同的資料
      let temp = this.cartData.carts.filter(item => item.product_id === product.id)
      // 取陣列中第一個物件
      temp = { ...temp[0] }
      const resultQty = temp.qty + qty
      if (resultQty > product.inventory) {
        statusMsg(false, '加入', '超過庫存數量')
        status.isLoadingItem = ''
      } else {
        axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
          data: {
            product_id: product.id,
            qty
          }
        }).then((res) => {
          emitter.emit('get-cart-list')
          statusMsg(res, '加入', '已成功加入購書車')
          status.isLoadingItem = ''
        }).catch(() => {
          statusMsg(false, '加入', '加入購書車失敗')
        })
      }
    }, 500),
    addCouponCode () {
      if (this.coupon_code === '') {
        statusMsg(false, '套用', '套用優惠券失敗')
      } else {
        axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`, {
          data: { code: this.coupon_code }
        })
          .then((res) => {
            emitter.emit('get-cart-list')
            statusMsg(res, '套用', '已套用優惠券')
          }).catch(() => {
            statusMsg(false, '套用', '套用優惠券失敗')
          })
      }
    },
    copyCouponCode () {
      // 讀取剪貼簿(優惠碼)的值
      navigator.clipboard.readText()
        .then((text) => {
          if (text.includes('si-yueh')) {
            this.coupon_code = text
          } else {
            this.coupon_code = ''
          }
        })
    }
  }
})
