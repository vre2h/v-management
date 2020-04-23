import * as firebase from "@/firebase";

export const signIn = ({ email, password }) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signUp = ({ email, password, ...info }) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      return firebase.usersCollection.doc(user.uid).set({
        ...info,
      });
    });
};
