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
            image: 'https://storage.googleapis.com/vue-course-api.appspot.com/zy123/1650811300799.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=YEIGRxho8nx9bQzpxvxeMDte7HnpXzzz2ZbtR3FngaWi6zH82N%2FNCznUMc9s4zYOEc6pg4IAOmi%2FVuxL24DvgjV6CXYFu%2FUHPnRWjl8EARzO1laTj3xrHJ%2FSKfXH4XxlGgoBJkILUX6ueiSi6yu2a7eZZ9fT7Ft3xBJQyfepb2H6mDok4p3hJ1%2BdjU7KLr5xwILQWVqFjEzOjofmEfJfUQIiBgvm3H7dC6RBOOvD9%2BdhgHNtpVpKaf%2FyRPyV4Vi2hXvtZPbW5FKNwpn%2FouLxU98Hu04BQcpNr3%2FTC8nS6CtnmKd64nRkiWBmrVpXhZW8ozoueus74vH27%2FiXK7pgvQ%3D%3D',
            description: '致力於傳遞惜書、愛書的精神，一起體驗文字的力量與閱讀的樂趣。'
          }
        }
        return args
      })
  }
}
