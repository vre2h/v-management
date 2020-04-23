import Vue from "vue";
import Router from "vue-router";
import * as firebase from "@/firebase";

import Timer from "@/pages/Timers.vue";
import SignIn from "@/pages/SignIn.vue";
import SignUp from "@/pages/SignUp.vue";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: "history",
  routes: [
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
  ],
});

router.beforeEach((to, _from, next) => {
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

export default router;
