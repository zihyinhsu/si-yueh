<template>
  <div class="toast-container position-fixed top-85 top-md-10 start-50 translate-middle z-index-3000">
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true"
      v-for="(msg,i) in messages" :key="i">
      <div class="toast-header">
        <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
        <strong class="me-auto">{{ msg.title }}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"
          @click="clearToast(i)"></button>
      </div>
      <div class="toast-body d-flex flex-column align-items-center text-dark" >
        <i class="fa-solid fa-2x mb-3" :class="`${msg.icon} text-${msg.style}`"></i>
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<script>
// 匯入 mapState、 mapActions 方法
import { mapState, mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'

export default {
  methods: {
    ...mapActions(statusStore, ['toastShow', 'clearToast', 'statusMsg'])
  },
  computed: {
    ...mapState(statusStore, ['messages'])
  },
  mounted () {
  }
}
</script>
