<template>
    <div class="toast-container position-fixed top-50 top-md-10 start-50 translate-middle" style="z-index:3000">
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true"
            v-for="(msg,i) in messages" :key="i">
            <div class="toast-header">
                <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
                <strong class="me-auto">{{msg.title}}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"
                @click="clearToast(i)"></button>
            </div>
                <div class="toast-body d-flex flex-column align-items-center text-dark" >
                    <i class="fa-solid fa-2x mb-3" :class="`${msg.icon} text-${msg.style}`"></i>
                    {{msg.content}}
                </div>
        </div>
    </div>
</template>

<script>
import emitter from '@/methods/emitter.js'

export default {

  data () {
    return {
      messages: []
    }
  },
  methods: {
    toastShow () {
      setTimeout(() => {
        this.messages.shift()
      }, 1500)
    },
    clearToast (index) {
      this.messages.splice(index, 1)
    }
  },
  mounted () {
    emitter.on('push-status-msg', (message) => {
      const { style, title, content, icon } = message
      this.messages.push({ style, title, content, icon })
      this.toastShow()
    })
  }
}
</script>
