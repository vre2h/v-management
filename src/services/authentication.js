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

const createNewUser = ({ id, name, email }) => firebase.db.ref(`users/${id}`).set({
  name,
  email,
});

export const signUp = ({ email, password, ...info }) => firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then((user) => createNewUser({ id: user.user.uid, email, name: info.name }).then(() => user))
  .then(sendVerificationEmail);

export const signOut = () => firebase.auth().signOut();
