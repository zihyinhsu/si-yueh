<template>
  <div class="d-flex">
    <AdminNavbar></AdminNavbar>
    <router-view/>
  </div>
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar'
export default {
  components: {
    AdminNavbar
  }
}
</script>
