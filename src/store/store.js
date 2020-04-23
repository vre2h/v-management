import Vue from "vue";
import Vuex from "vuex";

import * as notification from "@/store/modules/notification.js";
import * as user from "@/store/modules/user.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: { notification, user },
});
