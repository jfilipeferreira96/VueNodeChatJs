import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "login",
    meta: {
      title: "Login",
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "Register",
    },
    component: () => import("../views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
