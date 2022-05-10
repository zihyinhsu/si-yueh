"use strict";(self["webpackChunksi_yueh"]=self["webpackChunksi_yueh"]||[]).push([[745],{6294:function(e,s,t){var a=t(8262);s["Z"]=(0,a.Q_)("statusStore",{state:()=>({isLoadingItem:"",isLoading:!1,isBounced:!1,messages:[],message:{}}),actions:{loadingEffect(){this.isLoading=!0,setTimeout((()=>{this.isLoading=!1}),1e3)},loadingItemEffect(){this.isLoadingItem=!0,setTimeout((()=>{this.isLoadingItem=!1}),1e3)},toastShow(){setTimeout((()=>{this.messages.shift()}),1500)},clearToast(e){this.messages.splice(e,1)},pushMsg(e=!0,s="更新",t){this.message=e?{style:"primary",title:`${s}成功`,content:t,icon:"fa-circle-check"}:{style:"danger",title:`${s}失敗`,content:t,icon:"fa-circle-xmark"},this.statusMsg(this.message)},statusMsg(e){const{style:s,title:t,content:a,icon:r}=e;this.messages.push({style:s,title:t,content:a,icon:r}),this.toastShow()}}})},4349:function(e,s,t){t.d(s,{Z:function(){return M}});var a=t(6252),r=t(3577);const l={class:"container"},i={class:"row justify-content-center"},o={class:"col-md-6 py-5 py-md-8"},d={class:"row justify-content-between"},c={class:"col-4 col-md-2"},n=(0,a.Uk)("step "),m=(0,a._)("br",null,null,-1),p=(0,a.Uk)(" 1"),u=[n,m,p],b=(0,a._)("p",{class:"fw-bold text-primary text-center"},"建立訂單",-1),f={class:"col-4 col-md-2"},_=(0,a.Uk)("step"),g=(0,a._)("br",null,null,-1),h=(0,a.Uk)(" 2"),w=[_,g,h],v=(0,a._)("p",{class:"fw-bold text-primary text-center"},"確認付款",-1),y={class:"col-4 col-md-2"},x=(0,a.Uk)("step"),k=(0,a._)("br",null,null,-1),L=(0,a.Uk)(" 3"),I=[x,k,L],D=(0,a._)("p",{class:"fw-bold text-primary text-center"},"完成訂單",-1);function U(e,s,t,n,m,p){return(0,a.wg)(),(0,a.iD)("div",l,[(0,a._)("div",i,[(0,a._)("div",o,[(0,a._)("div",d,[(0,a._)("div",c,[(0,a._)("p",{class:(0,r.C_)(["text-white text-center fw-bold p-2 mb-2",t.cartData?"bg-primary box-shadow":"bg-primaryLight"])},u,2),b]),(0,a._)("div",f,[(0,a._)("p",{class:(0,r.C_)(["text-white text-center fw-bold p-2 mb-2",t.orderId?"bg-primary box-shadow":"bg-primaryLight"])},w,2),v]),(0,a._)("div",y,[(0,a._)("p",{class:(0,r.C_)(["text-white text-center fw-bold p-2 mb-2",t.orderIsPaid?"bg-primary box-shadow":"bg-primaryLight"])},I,2),D])])])])])}var $={props:["cartData","orderIsPaid","orderId"]},z=t(3744);const C=(0,z.Z)($,[["render",U]]);var M=C},2745:function(e,s,t){t.r(s),t.d(s,{default:function(){return re}});var a=t(6252),r=t(3577),l=t(9963),i=t(9163);const o=e=>((0,a.dD)("data-v-14a7eccc"),e=e(),(0,a.Cn)(),e),d=o((()=>(0,a._)("img",{src:i,alt:"Loading"},null,-1))),c={class:"bg-light"},n={class:"container pt-4 pb-5 pb-md-9"},m={class:"row justify-content-center"},p={class:"col-md-4 mb-6 mb-md-0"},u={class:"position-sticky top-20"},b={class:"mb-8"},f=o((()=>(0,a._)("div",{class:"d-flex mb-4"},[(0,a._)("p",{class:"bg-white text-primary fw-bold fs-4 fs-md-3 p-2"},"# 訂單編號")],-1))),_=o((()=>(0,a._)("p",{class:"fs-small text-danger mb-2"},"請記得複製以保存您的訂單編號，便於查找訂單狀態",-1))),g={class:"d-flex flex-column flex-md-row justify-content-md-between align-items-center"},h=o((()=>(0,a._)("div",{class:"d-flex mb-4"},[(0,a._)("p",{class:"bg-white text-primary fw-bold fs-4 fs-md-3 p-2"},"# 訂單內容")],-1))),w={class:"d-flex align-items-center w-90 p-3"},v=["src","alt"],y={class:"cart-body text-start"},x={class:"fw-bold"},k={class:"fw-bold"},L={class:"fw-bold text-primaryDark"},I={key:0,class:"text-danger fw-bold"},D={class:"w-10"},U={class:"text-secondaryDark fw-bold text-end mb-3 fs-md-4"},$={class:"col-md-5 offset-md-1"},z={class:"bg-white p-4 p-md-8"},C=o((()=>(0,a._)("h2",{class:"bg-light category fs-4 fs-md-3 d-inline-block text-primaryDark p-2 fw-bold mb-6"},"# 收件人資料",-1))),M={class:"mb-3"},O=o((()=>(0,a._)("label",{for:"email",class:"form-label fw-bold"},[(0,a.Uk)("Email"),(0,a._)("span",{class:"text-danger"},"*")],-1))),T=["value"],j={class:"d-flex"},Z={class:"mb-3 me-4"},N=o((()=>(0,a._)("label",{for:"name",class:"form-label fw-bold"},[(0,a.Uk)("收件人姓名"),(0,a._)("span",{class:"text-danger"},"*")],-1))),P=["value"],E={class:"mb-3"},S=o((()=>(0,a._)("label",{for:"tel",class:"form-label fw-bold"},[(0,a.Uk)("收件人電話"),(0,a._)("span",{class:"text-danger"},"*")],-1))),q=["value"],H={class:"mb-3"},W=o((()=>(0,a._)("label",{for:"address",class:"form-label fw-bold"},[(0,a.Uk)("收件人地址"),(0,a._)("span",{class:"text-danger"},"*")],-1))),Y=["value"],B={class:"mb-3"},K=o((()=>(0,a._)("label",{for:"payment",class:"form-label fw-bold"},[(0,a.Uk)("付款方式"),(0,a._)("span",{class:"text-danger"},"*")],-1))),Q=["value"],V={class:"mb-3"},A=o((()=>(0,a._)("label",{for:"message",class:"form-label fw-bold"},"備註",-1))),F=["value"],G={class:"text-end"};function J(e,s,t,i,o,J){const R=(0,a.up)("LoadingView"),X=(0,a.up)("OrderNav");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(R,{class:"loading",active:o.isLoading},{default:(0,a.w5)((()=>[d])),_:1},8,["active"]),(0,a._)("div",c,[(0,a.Wm)(X,{orderId:o.order},null,8,["orderId"]),(0,a._)("div",n,[(0,a._)("div",m,[(0,a._)("div",p,[(0,a._)("div",u,[(0,a._)("div",b,[f,_,(0,a._)("div",g,[(0,a._)("p",{ref:"orderId",class:"fs-5 fw-bold text-primaryDark mb-2 mb-md-0"},(0,r.zw)(o.order.id),513),(0,a._)("div",{class:"btn btn btn-primary w-100 w-md-auto text-white fs-small",onClick:s[0]||(s[0]=e=>J.copyOrderId(o.order.id))}," 複製訂單編號")])]),h,(0,a._)("ul",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(o.order.products,(e=>((0,a.wg)(),(0,a.iD)("li",{class:"d-flex justify-content-between align-items-center border-bottom-1 mb-4",key:e.id},[(0,a._)("div",w,[(0,a._)("img",{class:"ratio ratio-3x4 rounded-4 w-20 me-4",src:e.product.imageUrl,alt:e.product.title},null,8,v),(0,a._)("div",y,[(0,a._)("p",x,(0,r.zw)(e.product.title),1),(0,a._)("p",k,(0,r.zw)(e.product.author),1),(0,a._)("p",L,"NT$ "+(0,r.zw)(e.product.price),1),e.coupon?((0,a.wg)(),(0,a.iD)("p",I,"已套用優惠券")):(0,a.kq)("",!0)])]),(0,a._)("p",D,"x "+(0,r.zw)(e.qty),1)])))),128))]),(0,a._)("div",null,[(0,a._)("p",U," 總計金額 : NT$"+(0,r.zw)(Math.round(o.order.total)),1)])])]),(0,a._)("div",$,[(0,a._)("form",z,[C,(0,a._)("div",M,[O,(0,a._)("input",{id:"email",name:"email",type:"email",class:"form-control border-0",value:o.order.user.email,disabled:""},null,8,T)]),(0,a._)("div",j,[(0,a._)("div",Z,[N,(0,a._)("input",{id:"name",name:"姓名",type:"text",class:"form-control border-0",value:o.order.user.name,disabled:""},null,8,P)]),(0,a._)("div",E,[S,(0,a._)("input",{id:"tel",name:"電話",type:"text",class:"form-control border-0",value:o.order.user.tel,disabled:""},null,8,q)])]),(0,a._)("div",H,[W,(0,a._)("input",{id:"address",name:"地址",type:"text",class:"form-control border-0",value:o.order.user.address,disabled:""},null,8,Y)]),(0,a._)("div",B,[K,(0,a._)("input",{id:"payment",name:"付款方式",type:"text",class:"form-control border-0",value:o.order.user.payment,disabled:""},null,8,Q)]),(0,a._)("div",V,[A,(0,a._)("textarea",{id:"message",class:"form-control min-h-25 border-0",value:o.order.message,disabled:""},null,8,F)]),(0,a._)("div",G,[(0,a._)("button",{type:"submit",class:"btn btn-primary text-white w-100",onClick:s[1]||(s[1]=(0,l.iM)(((...e)=>J.pay&&J.pay(...e)),["prevent"]))},"確認付款")])])])])])])],64)}var R=t(8262),X=t(6294),ee=t(4349),se={data(){return{order:{user:{},products:{}},orderProducts:[],orderId:this.$route.params.id,isLoading:!1}},components:{OrderNav:ee.Z},methods:{...(0,R.nv)(X.Z,["pushMsg"]),getOrders(e){this.isLoading=!0,this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/zy123/order/${e}`).then((e=>{this.order=e.data.order,this.orderProducts=Object.keys(this.order.products).map((e=>this.order.products[e])),this.isLoading=!1})).catch((()=>{this.isLoading=!1}))},pay(){this.isLoading=!0,this.$http.post(`https://vue3-course-api.hexschool.io/v2/api/zy123/pay/${this.orderId}`).then((e=>{this.isLoading=!1,this.pushMsg(e,"更新","已付款成功"),this.$router.push("/payment")}))},copyOrderId(e){navigator.clipboard.writeText(e).then((()=>{this.pushMsg(!0,"複製","您已成功複製優惠碼!")}))}},mounted(){this.getOrders(this.orderId)}},te=t(3744);const ae=(0,te.Z)(se,[["render",J],["__scopeId","data-v-14a7eccc"]]);var re=ae},9163:function(e,s,t){e.exports=t.p+"img/loading.8a13cb6e.gif"}}]);
//# sourceMappingURL=745.1eb07dbf.js.map