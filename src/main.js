import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import pinia from "./store";
import "normalize.css/normalize.css";
import "element-plus/dist/index.css";

createApp(App).use(pinia).use(router).mount("#app");
