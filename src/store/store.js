import Vue from "vue";
import Vuex from "vuex";

import * as notification from "@/store/modules/notification.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: { notification },
});
