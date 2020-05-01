import Vue from 'vue';

// services
import * as firebase from '@/firebase';
import store from '@/store/store';
import { getUser } from '@/services/user.service';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

// i18n
import i18n from '@/i18n/i18n';

// UI
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'nprogress/nprogress.css';

// Routing
import router from './router';

// App
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

let app;

firebase.auth().onAuthStateChanged(() => {
  const currentUser = getUser();
  store.commit('user/SET_CURRENT_USER', currentUser);

  if (!app) {
    app = new Vue({
      el: '#app',
      store,
      router,
      render: (h) => h(App),
      i18n,
    });
  } else {
    throw new Error("Firebase isn't loaded!");
  }
});
