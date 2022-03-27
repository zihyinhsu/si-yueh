<template>
  <div class="d-flex">
    <AdminNavbar></AdminNavbar>
    <ToastMsg></ToastMsg>
    <div class="d-flex flex-column w-100 p-9 bg-light">
     <router-view v-if="checkSuccess"></router-view>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar'
import ToastMsg from '@/components/ToastMsg.vue'

export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  components: {
    AdminNavbar,
    ToastMsg
  },
  methods: {
    checkLogin () {
      // 取得 Token（Token 僅需要設定一次）
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)zyToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      // header的夾帶
      this.$http.defaults.headers.common.Authorization = token
      this.$http.post(`${process.env.VUE_APP_API}/api/user/check`)
        .then((res) => {
          this.checkSuccess = true
          this.$StatusMsg(res, '登入', '已成功登入')
        }).catch(() => {
          this.$StatusMsg(false, '登入', '請重新登入')
          // 轉址到登入頁
          this.$router.push('/login')
        })
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
