import { createApp, markRaw } from 'vue'
// pinia
import { createPinia } from 'pinia'

// vue-skeletor
import { Skeletor } from 'vue-skeletor'

// bootstrap
import 'bootstrap'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// fontawsome
import '@fortawesome/fontawesome-free'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// material icon
import 'material-icons'

// ck editor5
import CKEditor from '@ckeditor/ckeditor5-vue'

// vue-loading-overlay
import Loading from 'vue-loading-overlay' // component
import 'vue-loading-overlay/dist/vue-loading.css' // style

// vee-validate //
// 匯入 vee-validate 主套件
import {
  Field, Form, ErrorMessage, defineRule, configure
} from 'vee-validate'
// 匯入 vee-validate 相關規則
import AllRules from '@vee-validate/rules'
// 匯入多國語系的功能
import {
  localize, setLocale
} from '@vee-validate/i18n'
// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import { date } from '@/methods/filters.js'

import App from './App.vue'
import router from './router'

// 定義驗證規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true // 調整為輸入字元立即進行驗證
})

// 設定預設語系
setLocale('zh_TW')

// vee-validate //

// pinia
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
// 在每個store 添加 pinia
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})
app.use(router)

app.config.globalProperties.$filters = { date }

app.use(VueAxios, axios)
app.use(CKEditor)
app.component(Skeletor.name, Skeletor)
app.component('LoadingView', Loading)
app.component('FormView', Form)
app.component('FieldView', Field)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')
