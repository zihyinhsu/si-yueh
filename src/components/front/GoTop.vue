<template>
    <div @click="goTop">
        <div class="position-fixed start-82.5 start-md-90 bottom-5 z-index-3 cursor-pointer"
            :class="yScrollVaule < 50 ? 'd-none':''">
                <div class="bg-primary px-3 py-2 rounded-1" style="opacity:0.9">
                    <i class="fa-solid fa-circle-arrow-up text-white"></i>
                </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      yScrollVaule: ''
    }
  },
  methods: {
    goTop () {
      document.documentElement.scrollTop = 0
    },
    scrollWatch () {
    // 取得scrollY數值
      this.yScrollVaule = window.scrollY
    }
  },
  mounted () {
    // 監聽scroll，scrollWatch會寫入轉動網頁的y軸
    window.addEventListener('scroll', this.scrollWatch)
  }
}
</script>
