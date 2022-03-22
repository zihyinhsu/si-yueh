<template>
  <div class="d-flex">
    <AdminNavbar></AdminNavbar>
    <div class="d-flex flex-column w-100 p-9 bg-light">
     <router-view v-if="checkSuccess"></router-view>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar'
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  components: {
    AdminNavbar
  },
  methods: {
    checkLogin () {
      // 取得 Token（Token 僅需要設定一次）
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)zyToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      // header的夾帶
      this.$http.defaults.headers.common.Authorization = token
      this.$http.post(`${process.env.VUE_APP_API}/api/user/check`)
        .then(() => {
          this.checkSuccess = true
        }).catch((err) => {
          console.dir(err)
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
