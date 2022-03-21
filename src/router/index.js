import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "PublicPageOne" },
  },
  {
    path: "/login",
    name: "AuthLogin",
    component: () => import("@/components/AuthLogin.vue"),
  },
  {
    path: "/register",
    name: "AuthRegister",
    component: () => import("@/components/AuthRegister.vue"),
  },
  {
    path: "/public-page-one",
    name: "PublicPageOne",
    component: () => import("@/components/PublicPageOne.vue"),
  },
  {
    path: "/public-page-two",
    name: "PublicPageTwo",
    component: () => import("@/components/PublicPageTwo.vue"),
  },
  {
    path: "/private-page-one",
    name: "PrivatePageOne",
    component: () => import("@/components/PrivatePageOne.vue"),
  },
  {
    path: "/private-page-two",
    name: "PrivatePageTwo",
    component: () => import("@/components/PrivatePageTwo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
