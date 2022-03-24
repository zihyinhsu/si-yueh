<template >
    <!-- <metainfo>
      <template v-slot:title="{  }">{{  }} - Yay!</template>
    </metainfo> -->
<router-view/>
</template>

<style lang="scss">
@import "./assets/stylesheets/all.scss"
</style>

<script>
// import { useMeta } from 'vue-meta'

export default {
//   setup () {
//     useMeta({
//       title: 'My Example App',
//       htmlAttrs: {
//         lang: 'en',
//         amp: true
//       }
//     })
//   }
  metaInfo () {
    return {
      title: '徙閱二手書'
    }
  }
}
</script>
