import App from './App.vue'
import router from './router'
import mitt from 'mitt'

import './assets/styles/index.scss'

const app = createApp(App)

app.config.globalProperties.$bus = mitt()

app.use(createPinia())
app.use(router)



app.mount("#app")
