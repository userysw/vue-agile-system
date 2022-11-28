import './assets/styles/index.scss'

import mitt from 'mitt'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 全局事件总线
app.provide('$bus', mitt())

app.mount('#app')
