import * as firebase from '@/firebase';

export const signIn = ({ email, password }) => firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then((user) => {
    if (!user.user.emailVerified) {
      throw new Error('You should verify your email!');
    }

    return user;
  });

export const sendVerificationEmail = (user) => user.user.sendEmailVerification();

export const signUp = ({ email, password, ...info }) => firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then((user) => firebase.usersCollection
    .doc(user.user.uid)
    .set({
      ...info,
    })
    .then(() => user))
  .then(sendVerificationEmail);

export const signOut = () => firebase.auth().signOut();

export const getUserById = (uid) => firebase.usersCollection
  .doc(uid)
  .get()
  .then((res) => res.data());
