<template>
    <FrontNavbar></FrontNavbar>
    <ToastMsg></ToastMsg>
    <GoTop></GoTop>
    <router-view/>
    <FooterComponent></FooterComponent>

</template>

<script>
import FrontNavbar from '@/components/front/FrontNavbar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ToastMsg from '@/components/ToastMsg.vue'
import GoTop from '@/components/front/GoTop.vue'

export default {
  components: {
    FrontNavbar,
    FooterComponent,
    ToastMsg,
    GoTop
  }
}
</script>
