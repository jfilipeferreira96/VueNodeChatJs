import { createRouter, createWebHashHistory } from "vue-router";
import store from '../store/index';

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
  {
    path: "/chat",
    name: "chat",
    meta: {
      title: "Chat",
      requiresAuth: true,
    },
    component: () => import("../views/Chat.vue"),
  },
  // Redirect to 404 page, if no match found
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    meta: {
      title: "404 - Error Page",
    },
    component: () => import("../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem(process.env.VUE_APP_LOCALHOSTKEY)) {
      next({ name: "login" });
    } else{
      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth
  }
});

export default router;
