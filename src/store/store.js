import Vue from 'vue';
import Vuex from 'vuex';

import * as notification from '@/store/modules/notification.store';
import * as user from '@/store/modules/user.store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: { notification, user },
});
