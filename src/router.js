import Vue from "vue";
import Router from "vue-router";
import * as firebase from "@/firebase";
import loader from "nprogress";

import Timer from "@/pages/Timers.vue";
import SignIn from "@/pages/SignIn.vue";
import SignUp from "@/pages/SignUp.vue";
import NotFound from "@/pages/NotFound.vue";
import Home from "@/pages/Home.vue";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignIn,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
    },
    {
      path: "/timer",
      component: Timer,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/404",
      name: "404",
      component: NotFound,
      props: true,
    },
    {
      path: "*",
      redirect: { name: "404", params: { resource: "page" } },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  loader.start();

  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/sign-in");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

router.afterEach(() => {
  loader.done();
});

export default router;