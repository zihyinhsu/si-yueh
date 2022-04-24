import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

export default {
  data () {
    return {
      modules: [Autoplay, Pagination]
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
