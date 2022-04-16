<template>
    <FrontNavbar/>
    <ToastMsg/>
    <GoTop/>
    <ShareButton/>
    <RouterView/>
    <FooterComponent/>
</template>

<script>
import FrontNavbar from '@/components/front/FrontNavbar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ToastMsg from '@/components/ToastMsg.vue'
import GoTop from '@/components/front/GoTop.vue'
import ShareButton from '@/components/front/ShareButton.vue'

export default {
  components: {
    FrontNavbar,
    FooterComponent,
    ToastMsg,
    GoTop,
    ShareButton
  }
}
</script>
