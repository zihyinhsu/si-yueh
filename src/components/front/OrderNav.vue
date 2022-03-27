<template>
    <div class="container">
           <div class="row justify-content-center">
                 <div class="col-md-6 py-5 py-md-8">
                  <div class="row justify-content-between">
                      <div class="col-4 col-md-2">
                           <p class="text-white text-center fw-bold p-2 mb-2"
                           :class="cartData ? 'bg-primary box-shadow' : 'bg-primaryLight'" >step <br> 1</p>
                           <p class="fw-bold text-primary text-center">建立訂單</p>
                      </div>
                      <div class="col-4 col-md-2">
                           <p class="text-white text-center fw-bold p-2 mb-2"
                           :class="orderId ? 'bg-primary box-shadow' : 'bg-primaryLight'">step<br> 2</p>
                           <p class="fw-bold text-primary text-center">確認付款</p>
                      </div>
                      <div class="col-4 col-md-2">
                           <p class="text-white text-center fw-bold p-2 mb-2"
                           :class="orderIsPaid ? 'bg-primary box-shadow' : 'bg-primaryLight'">step<br> 3</p>
                           <p class="fw-bold text-primary text-center">完成訂單</p>
                      </div>
                  </div>
           </div>
           </div>
       </div>
</template>

<script>
export default {
  props: ['cartData', 'orderIsPaid', 'orderId']
}
</script>
