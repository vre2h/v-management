import firebase from 'firebase';
import 'firebase/database';

const {
  VUE_APP_API_KEY,
  VUE_APP_AUTH_DOMAIN,
  VUE_APP_DATABASE_URL,
  VUE_APP_PROJECT_ID,
  VUE_APP_STORAGE_BUCKET,
  VUE_APP_MESSAGING_SENDER_ID,
  VUE_APP_APP_ID,
} = process.env;

// firebase init goes here
const config = {
  apiKey: VUE_APP_API_KEY,
  authDomain: VUE_APP_AUTH_DOMAIN,
  databaseURL: VUE_APP_DATABASE_URL,
  projectId: VUE_APP_PROJECT_ID,
  storageBucket: VUE_APP_STORAGE_BUCKET,
  messagingSenderId: VUE_APP_MESSAGING_SENDER_ID,
  appId: VUE_APP_APP_ID,
};

firebase.initializeApp(config);

// firebase utils
const db = firebase.database();
const { auth } = firebase;
const { currentUser } = auth();

export {
  db, auth, currentUser,
};
