import * as firebase from '@/firebase';

export const saveNewTimer = (uid, timer) => {
  const newTimerKey = firebase.database().ref().child('posts').push().key;
  const updates = {};
  updates[`/user-timers/${uid}/${newTimerKey}`] = timer;

  return firebase.database().ref().update(updates);
};

export const getTimersByUserId = (uid) => firebase.db.ref(`/user-timers/${uid}`).once('value').then((snapshot) => snapshot.val());

// export const getTimersByUserIdAndDate = (uid, date) => {
// };
