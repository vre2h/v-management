export const namespaced = true;
export const state = {
  notifications: [],
};

let nextId = 1;

export const mutations = {
  PUSH(iState, notification) {
    iState.notifications.push({
      ...notification,
      id: (nextId += 1),
    });
  },
  DELETE(iState, notificationToRemove) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== notificationToRemove.id,
    );
  },
};

export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification);
  },
  remove({ commit }, notification) {
    commit('DELETE', notification);
  },
};
