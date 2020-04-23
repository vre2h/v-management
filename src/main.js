import Vue from "vue";
import App from "./App";

import * as firebase from "@/firebase";
// UI
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Routing
import router from "./router";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      render: (h) => h(App),
    });
  }
});
