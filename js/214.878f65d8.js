"use strict";(self["webpackChunksi_yueh"]=self["webpackChunksi_yueh"]||[]).push([[214],{4349:function(t,r,e){e.d(r,{Z:function(){return j}});var s=e(6252),a=e(3577);const c={class:"container"},n={class:"row justify-content-center"},i={class:"col-md-6 py-5 py-md-8"},o={class:"row justify-content-between"},l={class:"col-4 col-md-2"},d=(0,s.Uk)("step "),u=(0,s._)("br",null,null,-1),p=(0,s.Uk)(" 1"),m=[d,u,p],b=(0,s._)("p",{class:"fw-bold text-primary text-center"},"建立訂單",-1),f={class:"col-4 col-md-2"},_=(0,s.Uk)("step"),w=(0,s._)("br",null,null,-1),h=(0,s.Uk)(" 2"),x=[_,w,h],v=(0,s._)("p",{class:"fw-bold text-primary text-center"},"確認付款",-1),y={class:"col-4 col-md-2"},k=(0,s.Uk)("step"),g=(0,s._)("br",null,null,-1),D=(0,s.Uk)(" 3"),U=[k,g,D],I=(0,s._)("p",{class:"fw-bold text-primary text-center"},"完成訂單",-1);function C(t,r,e,d,u,p){return(0,s.wg)(),(0,s.iD)("div",c,[(0,s._)("div",n,[(0,s._)("div",i,[(0,s._)("div",o,[(0,s._)("div",l,[(0,s._)("p",{class:(0,a.C_)(["text-white text-center fw-bold p-2 mb-2",e.cartData?"bg-primary box-shadow":"bg-primaryLight"])},m,2),b]),(0,s._)("div",f,[(0,s._)("p",{class:(0,a.C_)(["text-white text-center fw-bold p-2 mb-2",e.orderId?"bg-primary box-shadow":"bg-primaryLight"])},x,2),v]),(0,s._)("div",y,[(0,s._)("p",{class:(0,a.C_)(["text-white text-center fw-bold p-2 mb-2",e.orderIsPaid?"bg-primary box-shadow":"bg-primaryLight"])},U,2),I])])])])])}var P={props:["cartData","orderIsPaid","orderId"]},Z=e(3744);const L=(0,Z.Z)(P,[["render",C]]);var j=L},6214:function(t,r,e){e.r(r),e.d(r,{default:function(){return k}});var s=e(6252),a=e(3577);const c={class:"bg-light"},n={class:"container"},i={class:"row vh-70 vh-md-50 align-items-center"},o={class:"col"},l={class:"d-flex flex-column align-items-center"},d=(0,s._)("i",{class:"fa-solid fa-circle-check fa-4x text-primary mb-4"},null,-1),u=(0,s._)("p",{class:"text-primaryDark fw-bold text-center fs-4 fs-md-3 mb-4"},"您已成功付款 ",-1),p={class:"text-primary fw-bold text-center mb-4"},m=(0,s.Uk)("該頁將在 "),b={class:"text-primaryDark fs-4"},f=(0,s.Uk)(" 秒後自動跳轉 "),_=(0,s.Uk)("點擊跳轉");function w(t,r,e,w,h,x){const v=(0,s.up)("OrderNav"),y=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",c,[(0,s.Wm)(v,{"order-is-paid":h.orderIsPaid},null,8,["order-is-paid"]),(0,s._)("div",n,[(0,s._)("div",i,[(0,s._)("div",o,[(0,s._)("div",l,[d,u,(0,s._)("p",p,[m,(0,s._)("span",b,(0,a.zw)(h.count),1),f]),(0,s.Wm)(y,{to:"/",class:"btn btn-sm btn-primaryDark fs-5 fs-md-4 text-white"},{default:(0,s.w5)((()=>[_])),_:1})])])])])])}var h=e(4349),x={data(){return{orderIsPaid:!0,count:4}},components:{OrderNav:h.Z},methods:{countDown(){this.count--,0===this.count&&this.$router.push("/"),setTimeout((()=>{this.countDown()}),1e3)}},mounted(){this.countDown()}},v=e(3744);const y=(0,v.Z)(x,[["render",w]]);var k=y}}]);
//# sourceMappingURL=214.878f65d8.js.map