"use strict";(self["webpackChunksi_yueh"]=self["webpackChunksi_yueh"]||[]).push([[134],{6294:function(s,e,t){var a=t(8262);e["Z"]=(0,a.Q_)("statusStore",{state:()=>({isLoadingItem:"",isLoading:!1,isBounced:!1,messages:[],message:{}}),actions:{loadingEffect(){this.isLoading=!0,setTimeout((()=>{this.isLoading=!1}),1e3)},loadingItemEffect(){this.isLoadingItem=!0,setTimeout((()=>{this.isLoadingItem=!1}),1e3)},toastShow(){setTimeout((()=>{this.messages.shift()}),1500)},clearToast(s){this.messages.splice(s,1)},pushMsg(s=!0,e="更新",t){this.message=s?{style:"primary",title:`${e}成功`,content:t,icon:"fa-circle-check"}:{style:"danger",title:`${e}失敗`,content:t,icon:"fa-circle-xmark"},this.statusMsg(this.message)},statusMsg(s){const{style:e,title:t,content:a,icon:i}=s;this.messages.push({style:e,title:t,content:a,icon:i}),this.toastShow()}}})},8134:function(s,e,t){t.r(e),t.d(e,{default:function(){return x}});var a=t(6252),i=t(9963);const n={class:"position-relative bg-light window-height"},o=(0,a._)("div",{class:"banner"},[(0,a._)("img",{class:"w-100",src:"https://cdn-news.readmoo.com/wp-content/uploads/2020/10/annelies-geneyn-bhBONc07WsI-unsplash.jpg",alt:"Login"})],-1),r={class:"container position-absolute top-50 start-50 translate-middle"},c={class:"row justify-content-center"},l={class:"col-md-4"},d={class:"bg-white box-shadow p-8 rounded-4"},u=(0,a._)("h1",{class:"text-center text-secondaryDark fw-bold mb-5"},"後臺管理",-1),h={class:"mb-5"},m=(0,a._)("label",{for:"Email address",class:"form-label text-secondaryDark w-100"},"Email",-1),p={class:"mb-5"},g=(0,a._)("label",{for:"password",class:"form-label text-secondaryDark w-100"},"密碼",-1),w=(0,a._)("button",{type:"submit",class:"btn btn-primary text-white w-100"},"登入",-1);function f(s,e,t,f,b,y){return(0,a.wg)(),(0,a.iD)("div",n,[o,(0,a._)("div",r,[(0,a._)("div",c,[(0,a._)("div",l,[(0,a._)("form",{id:"form",class:"form-signin",onSubmit:e[2]||(e[2]=(0,i.iM)(((...s)=>y.signIn&&y.signIn(...s)),["prevent"]))},[(0,a._)("div",d,[u,(0,a._)("div",h,[m,(0,a.wy)((0,a._)("input",{type:"email",class:"form-control border-secondaryDark","onUpdate:modelValue":e[0]||(e[0]=s=>b.user.username=s),id:"Email address",placeholder:"name@example.com"},null,512),[[i.nr,b.user.username]])]),(0,a._)("div",p,[g,(0,a.wy)((0,a._)("input",{type:"password",class:"form-control border-secondaryDark","onUpdate:modelValue":e[1]||(e[1]=s=>b.user.password=s),id:"password"},null,512),[[i.nr,b.user.password]])]),w])],32)])])])])}var b=t(8262),y=t(6294),_={data(){return{user:{username:"",password:""}}},methods:{...(0,b.nv)(y.Z,["pushMsg"]),signIn(){""===this.user.username||""===this.user.password?this.pushMsg(!1,"登入","請輸入帳號或密碼"):this.$http.post("https://vue3-course-api.hexschool.io/v2/admin/signin",this.user).then((s=>{const{token:e,expired:t}=s.data;document.cookie=`zyToken=${e}; expires=${new Date(t)}`,this.$router.push("/admin/products")})).catch((()=>{this.pushMsg(!1,"登入","請重新登入"),this.user.password=""}))}}},v=t(3744);const k=(0,v.Z)(_,[["render",f]]);var x=k}}]);
//# sourceMappingURL=134.12833edc.js.map