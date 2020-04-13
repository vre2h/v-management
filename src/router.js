import Vue from "vue";
import Router from "vue-router";

import Timer from "./components/Timer.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/timer",
      component: Timer
    }
  ]
});
