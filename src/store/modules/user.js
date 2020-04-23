import {
  getUserById,
  signIn,
  signUp,
  signOut,
} from "@/services/authentication";
import loader from "nprogress";
import { get } from "lodash";

export const namespaced = true;

export const state = {
  currentUser: null,
  userProfile: {},
};

export const mutations = {
  CLEAN_USER(state) {
    state.currentUser = null;
    state.userProfile = {};
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
  },
  SET_USER_PROFILE(state, profile) {
    state.userProfile = profile;
  },
};

export const actions = {
  fetchUserProfile({ commit, state, dispatch }) {
    const uid = get(state, "currentUser.uid", "");

    if (!uid) return;

    return getUserById(uid)
      .then((user) => {
        commit("SET_USER_PROFILE", user);
      })
      .catch((err) => {
        loader.done();
        const notification = {
          type: "error",
          message: err.message,
        };

        dispatch("notification/add", notification, { root: true });
        throw new Error(err);
      });
  },
  signIn({ dispatch, commit }, userInfo) {
    loader.start();

    return signIn(userInfo)
      .then((user) => {
        commit("SET_CURRENT_USER", user.user);

        const notification = {
          type: "success",
          message: "You've successfully signed in!",
        };

        return dispatch("fetchUserProfile").then(() => {
          return dispatch("notification/add", notification, { root: true });
        });
      })
      .catch((err) => {
        loader.done();
        const notification = {
          type: "error",
          message: err.message,
        };

        dispatch("notification/add", notification, { root: true });
        throw new Error(err);
      });
  },
  signUp({ dispatch }, user) {
    loader.start();
    return signUp(user)
      .then(() => {
        const notification = {
          type: "success",
          message: "You've successfully signed up!",
        };

        dispatch("notification/add", notification, { root: true });
      })
      .catch((err) => {
        loader.done();

        const notification = {
          type: "error",
          message: err.message,
        };

        dispatch("notification/add", notification, { root: true });
        throw new Error(err);
      });
  },
  signOut({ dispatch, commit, state }) {
    loader.start();

    return signOut()
      .then(() => {
        commit("CLEAN_USER");

        const notification = {
          type: "success",
          message: "You've successfully signed out!",
        };

        dispatch("notification/add", notification, { root: true });

        return state.user;
      })
      .catch((err) => {
        loader.done();
        const notification = {
          type: "error",
          message: err.message,
        };

        dispatch("notification/add", notification, { root: true });

        throw new Error(err);
      });
  },
};
