import App from "./App.vue";
import router from "./router";

import './assets/styles/index.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");