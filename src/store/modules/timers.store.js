import * as Timers from '@/services/timer.service';
import moment from 'moment';

export const namespaced = true;
export const state = {
  timers: [],
};

export const mutations = {
  SET_TIMERS(state, timers) {
    state.timers = timers;
  },
  PUSH_TIMER(state, timer) {
    state.timers.push(timer);
  },
  REMOVE_TIMER(state, timerId) {
    state.timers = state.timers.filter(({ id }) => timerId !== id);
  },
};

export const actions = {
  getAllByUserIdAndDate({ commit, rootState }, { filterDate }) {
    return Timers.getTimersByUserIdAndDate(
      rootState.user.currentUser.uid,
      filterDate,
    ).then((timers = []) => {
      commit('SET_TIMERS', timers);
    });
  },
  delete({ dispatch, rootState, commit }, timerId) {
    return Timers.deleteTimer(rootState.user.currentUser.uid, timerId).then(
      () => {
        commit('REMOVE_TIMER', timerId);
        const notification = {
          type: 'success',
          message: 'Your timer successfully deleted!',
        };
        dispatch('notification/add', notification, { root: true });
      },
    );
  },
  save({ dispatch }, timer) {
    const newTimer = {
      ...timer,
      status: 'finished',
      date: moment(new Date()).format('MM-DD-YYY'),
    };
    return dispatch('saveTimer', newTimer);
  },
  stopAndSave({ dispatch }, { timer, completedTime }) {
    const minutes = Math.floor(completedTime / 60);
    const seconds = completedTime % 60;
    const newTimer = {
      ...timer,
      status: 'stopped_and_saved',
      completedMinutes: minutes,
      completedSeconds: seconds,
      date: moment(new Date()).format('MM-DD-YYYY'),
    };
    return dispatch('saveTimer', newTimer);
  },
  saveTimer({ rootState, commit, dispatch }, newTimer) {
    return Timers.saveNewTimer(rootState.user.currentUser.uid, newTimer).then(
      () => {
        commit('PUSH_TIMER', newTimer);
        const notification = {
          type: 'success',
          message: 'Your timer successfully saved!',
        };
        dispatch('notification/add', notification, { root: true });
      },
    );
  },
};
