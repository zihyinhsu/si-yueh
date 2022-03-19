<template>
    <div style="cursor: default;" @click="dropdownMenu">
        <div class="cart-header py-4 d-flex flex-column align-items-center border-bottom-2">
            <p class="fs-4 fw-bold text-primaryDark letter-md-spacing border-primary">購書車</p>
        </div>
        <div class="cart-body overflow-auto vh-70">
            <ul class="h-100">
                <li class="d-flex justify-content-between align-items-center border p-3" v-for="item in tempCartData.carts" :key="item.id">
                    <div class="d-flex align-items-center w-100">
                        <router-link class="rounded-1 overflow-hidden me-2" :to="`/product/${item.product.id}`" style="cursor: pointer; width:80px;">
                            <img class="ratio ratio-3x4" :src="item.product.imageUrl" :alt="item.product.title">
                        </router-link>
                        <div class="cart-body w-100 me-1">
                            <p class="fw-bold">{{item.product.title}}</p>
                            <p class="fw-bold text-primaryDark">NT$ {{item.product.price}}</p>
                            <div class="input-group">
                                <div class="input-group w-md-75">
                                    <button class="btn btn-outline-primary minus fs-small" type="button" @click="updateCartItem(item),(item.qty--)">
                                        <i class="fa-solid fa-minus"></i></button>
                                    <input type="number" class="form-control text-center fs-small" min="1" max="10" v-model="item.qty">
                                    <button class="btn btn-primary plus fs-small" type="button" @click="updateCartItem(item),(item.qty++)">
                                        <i class="fa-solid fa-plus text-white"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <i class="fa-solid fa-trash text-secondary" style="cursor:pointer"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import emitter from '@/methods/emitter.js'
export default {
  props: ['cartData'],
  data () {
    return {
      tempCartData: []
    }
  },
  watch: {
    cartData: {
      handler () {
        this.tempCartData = JSON.parse(JSON.stringify(this.cartData))
      },
      deep: true
    }
  },
  methods: {
    // dropDown點擊後不消失
    dropdownMenu (e) {
      e.stopPropagation()
    },
    updateCartItem (item) {
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, {
        data: {
          product_id: item.id,
          qty: Number(item.qty)
        }
      })
        .then((res) => {
          emitter.emit('get-cart-list')
          alert(res.data.message)
        }).catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    // this.tempCartData = JSON.parse(JSON.stringify(this.cartData))
  }
}
</script>
