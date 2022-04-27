<template>
  <div @click="socialShare">
    <div class="position-fixed start-82.5 start-md-90 bottom-13 z-index-3 cursor-pointer"
      :class="yScrollVaule < 50 ? 'd-none':''">
      <div class="bg-primaryDark px-3 py-2 opacity-0.9 rounded-circle">
          <i class="fa-solid fa-share text-white"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import statusStore from '@/stores/statusStore'
import throttle from 'lodash/throttle'

export default {
  data () {
    return {
      yScrollVaule: ''
    }
  },
  methods: {
    ...mapActions(statusStore, ['pushMsg']),
    socialShare () {
      if (navigator.share) {
        navigator.share({
          title: '徙閱二手書',
          text: '徙閱二手書致力於傳遞惜書、愛書的精神，邀請你一起體驗文字的力量與閱讀的樂趣。',
          url: 'https://zihyinhsu.github.io/si-yueh/#/'
        })
          .then(() => this.pushMsg(true, '分享', '已成功分享'))
          .catch(() => this.pushMsg(false, '分享', '分享失敗'))
      }
    },
    scrollWatch: throttle(function () {
      this.yScrollVaule = window.scrollY
    }, 250)
  },
  mounted () {
    // 監聽scroll，scrollWatch會寫入轉動網頁的y軸
    window.addEventListener('scroll', this.scrollWatch)
  }
}
</script>

<style lang="scss" scoped>
.opacity-0\.9{
  opacity:0.9;
}
</style>
