import Vue from "vue";

import * as firebase from "@/firebase";
import store from "@/store/store";

// UI
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "nprogress/nprogress.css";

import App from "./App";

// Routing
import router from "./router";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

let app;

firebase.auth().onAuthStateChanged((user) => {
  store.commit("user/SET_CURRENT_USER", user);

  if (!app) {
    app = new Vue({
      el: "#app",
      store,
      router,
      render: (h) => h(App),
    });
  }
});
