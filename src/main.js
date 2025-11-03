
import 'normalize.css/normalize.css'
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'
import './common/css/base.css'

import './common/assets/icon/iconfont.css'
const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const host = import.meta.env.VITE_APP_API_URL
console.log(isMobile)
if (isMobile) {
  window.location.href = `${host}/mobile`
  // window.location.href = 'http://192.168.1.51:82/mobile'
}
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')


