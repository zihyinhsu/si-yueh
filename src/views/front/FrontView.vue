<template>
    <FrontNavbar></FrontNavbar>
    <ToastMsg></ToastMsg>
    <router-view/>
    <FooterComponent></FooterComponent>

</template>

<script>
import FrontNavbar from '@/components/front/FrontNavbar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ToastMsg from '@/components/ToastMsg.vue'

export default {
  components: {
    FrontNavbar,
    FooterComponent,
    ToastMsg
  }
}
</script>
