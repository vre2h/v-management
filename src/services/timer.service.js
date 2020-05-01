import * as firebase from '@/firebase';

export const saveNewTimer = (uid, timer) => {
  const newTimerKey = firebase.db
    .ref()
    .child('posts')
    .push().key;
  const updates = {};
  updates[`/user-timers/${uid}/${newTimerKey}`] = {
    ...timer,
    uid,
    id: newTimerKey,
  };

  return firebase.db.ref().update(updates);
};

export const deleteTimer = (uid, timerId) =>
  firebase.db.ref(`/user-timers/${uid}/${timerId}`).remove();

export const getTimersByUserId = (uid) =>
  firebase.db
    .ref(`/user-timers/${uid}`)
    .once('value')
    .then((snapshot) => snapshot.val());

export const getTimersByUserIdAndDate = (uid, filterDate) =>
  firebase.db
    .ref(`/user-timers/${uid}`)
    .once('value')
    .then((snapshot) => snapshot.val())
    .then((timers) => Object.values(timers || {}).filter(filterDate));
