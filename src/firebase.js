import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBmQEGROqUSYkHzHmegUAj1TNrXf956DL8",
  authDomain: "full-belly-kids-run.firebaseapp.com",
  projectId: "full-belly-kids-run",
  storageBucket: "full-belly-kids-run.appspot.com",
  messagingSenderId: "615172825869",
  appId: "1:615172825869:web:c5cee1305c58d6e02f4644",
  measurementId: "G-KBXP35DWLT"
};

firebase.initializeApp(firebaseConfig);
export default firebase;