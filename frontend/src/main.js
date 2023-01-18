import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/main.css";
import Toaster from "@meforma/vue-toaster";

createApp(App).use(router).use(Toaster, { position: "top" }).mount("#app");
