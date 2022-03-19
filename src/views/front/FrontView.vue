<template>
    <FrontNavbar></FrontNavbar>
    <router-view/>
    <FooterComponent></FooterComponent>

</template>

<script>
import FrontNavbar from '@/components/front/FrontNavbar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  components: {
    FrontNavbar,
    FooterComponent
  }
}
</script>
