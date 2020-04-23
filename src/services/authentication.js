import * as firebase from "@/firebase";

export const signIn = ({ email, password }) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      if (!user.emailVerified) {
        throw new Error("You should verify your email!");
      }

      return user;
    });
};

export const verifyEmail = (email) => {
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    return firebase.auth().signInWithEmailLink(email, window.location.href);
  }

  throw new Error("It seems like your confirmation link is broken!");
};

export const sendVerificationEmail = (user) => {
  var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: `https://v-manage.herokuapp.com/email-verification?email=${user.user.email}&uid=${user.user.uid}`,
    // This must be true.
    handleCodeInApp: true,
  };

  return firebase
    .auth()
    .sendSignInLinkToEmail(user.user.email, actionCodeSettings);
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
