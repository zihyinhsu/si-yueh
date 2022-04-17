const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: ['vue-meta'] // true
})

// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/si-yueh/'
    : '/',
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        const [meta] = args
        meta.title = '徙閱二手書'
        meta.icon = 'favicon.ico'
        meta.meta = {
          keywords: '二手書',
          description: '致力於傳遞惜書、愛書的精神，一起體驗文字的力量與閱讀的樂趣。',
          og: {
            type: 'website',
            url: 'https://zihyinhsu.github.io/si-yueh/#/',
            title: '徙閱二手書',
            image: '@/public/favicon.ico',
            description: '致力於傳遞惜書、愛書的精神，一起體驗文字的力量與閱讀的樂趣。'
          }
        }
        return args
      })
  }
}
