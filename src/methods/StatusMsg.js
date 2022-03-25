import emitter from '@/methods/emitter.js'

export default function (res = true, title = '更新', content) {
  if (res) {
    emitter.emit('push-status-msg', {
      style: 'primary',
      title: `${title}成功`,
      content: content,
      icon: 'fa-circle-check'
    })
  } else {
    emitter.emit('push-status-msg', {
      style: 'danger',
      title: `${title}失敗`,
      content: content,
      icon: 'fa-circle-xmark'
    })
  }
}
