import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from "./App.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router";
import "./assets/main.css";
import { MdsConfig } from "@maersk-global/mds-config";
import Notifications from '@kyvg/vue3-notification'
MdsConfig.iconsDynamicImportPath = "../../";



const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Notifications);
app.use(ElementPlus);
app.use(pinia);
app.mount("#app");
