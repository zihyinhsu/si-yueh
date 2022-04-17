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
import { canUseShare, share, generateUrl } from 'csr-social-share'
import throttle from 'lodash/throttle'

export default {
  data () {
    return {
      yScrollVaule: '',
      previewInfo: {
        title: '徙閱二手書',
        description: '致力於傳遞惜書、愛書的精神，一起體驗文字的力量與閱讀的樂趣。',
        imageUrl: 'https://i.imgur.com/rvUCzhD.png',
        targetUrl: 'https://zihyinhsu.github.io/si-yueh/#/'
      },
      shareDataInfo: {
        url: '',
        text: '嗨嗨我的好朋朋，這裡推薦一個可以便宜買書又讚讚的網站給妳~',
        title: '徙閱二手書'
      }
    }
  },
  methods: {
    canUseShare,
    share,
    generateUrl,
    generateShareUrl () {
      // 生成網址 使用then在promise中取得回傳值
      generateUrl(this.previewInfo).then((res) => {
        this.shareDataInfo.url = res
      })
    },
    socialShare () {
      if (!canUseShare(this.shareDataInfo)) {
        return
      }
      share(this.shareDataInfo)
    },
    scrollWatch: throttle(function () {
      this.yScrollVaule = window.scrollY
    }, 250)
  },
  mounted () {
    // 監聽scroll，scrollWatch會寫入轉動網頁的y軸
    window.addEventListener('scroll', this.scrollWatch)
    this.generateShareUrl()
  }
}
</script>

<style lang="scss" scoped>
.opacity-0\.9{
  opacity:0.9;
}
</style>
