import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import pinia from "./store";
import "normalize.css/normalize.css";
import "element-plus/dist/index.css";

import { AVPlugin } from "vue-audio-visual";

createApp(App).use(pinia).use(router).use(AVPlugin).mount("#app");
