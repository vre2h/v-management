import * as firebase from "@/firebase";

export const signIn = ({ email, password }) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      if (!user.user.emailVerified) {
        throw new Error("You should verify your email!");
      }

      return user;
    });
};

export const sendVerificationEmail = (user) => {
  return user.user.sendEmailVerification();
};

export const signUp = ({ email, password, ...info }) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      return firebase.usersCollection
        .doc(user.user.uid)
        .set({
          ...info,
        })
        .then(() => user);
    })
    .then(sendVerificationEmail);
};

export const signOut = () => {
  return firebase.auth().signOut();
};

export const getUserById = (uid) => {
  return firebase.usersCollection
    .doc(uid)
    .get()
    .then((res) => {
      return res.data();
    });
};
