
import 'normalize.css/normalize.css'
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './common/css/base.css'
const app = createApp(App)
import './common/assets/icon/iconfont.css'

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
