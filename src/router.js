import Vue from "vue";
import Router from "vue-router";

import Timer from "@/pages/Timers.vue";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: "history",
  routes: [
    {
      path: "/timer",
      component: Timer,
    },
  ],
});
