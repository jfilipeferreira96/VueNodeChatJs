import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/main.css";
import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  //for toast
  // You can set your default options here
};

Vue.use(Toast, options);

createApp(App).use(router).mount("#app");
