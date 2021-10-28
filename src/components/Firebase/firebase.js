import app from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailandPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** DB API ***
  activities = () => this.db.ref('activities');

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  updateActivity = (activityList, uid) =>
    this.db.ref(`users/${uid}/completedActivities`).set(activityList);

  updateTenActivitiesCompleted = (uid) => {
    this.db.ref(`users/${uid}/tenActivitiesCompleted`).set(true);
  };

  updateAllActivitiesCompleted = (uid) => {
    this.db.ref(`users/${uid}/allActivitiesCompleted`).set(true);
  };

  getImageUrl = (imageUrl) =>
    this.storage.refFromURL(imageUrl).getDownloadURL();
}

export default Firebase;
