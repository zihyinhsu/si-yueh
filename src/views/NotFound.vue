<template>
     <FrontNavbar></FrontNavbar>
     <div class="bg-light">
        <div class="container vh-82.5">
                <div class="d-flex flex-column align-items-center py-15 py-md-21">
                    <img class="size-100 size-md-150" src="../assets/images/bookGif.gif" alt="">
                    <h2 class="fw-bold mb-4 fs-1 fs-md-display"> 404 NOT FOUND</h2>
                    <p class="text-primary fw-bold text-center fs-4 fs-md-3 mb-4">噢歐，你要找的頁面好像不在這裡 <br class="d-md-none"> Σ( ° △ °) </p>
                    <p class="text-primary fw-bold text-center fs-5 fs-md-4 ">不過您可以點
                        <router-link to="/" class="btn btn-sm btn-primaryDark fs-5 fs-md-4 text-white">這裡</router-link>
                    回到首頁~ </p>
                </div>
        </div>
    </div>
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
