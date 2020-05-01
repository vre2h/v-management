import { get } from 'lodash';

import * as firebase from '@/firebase';

const isUserVerified = (user) => {
  const verifiedUser = get(user, 'emailVerified', null);
  return verifiedUser ? user : null;
};

export const getUserProfileById = (uid) =>
  firebase.db
    .ref(`/users/${uid}`)
    .once('value')
    .then((snapshot) => snapshot.val());

export const getUser = () => isUserVerified(firebase.auth().currentUser);
