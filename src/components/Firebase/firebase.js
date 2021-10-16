import app from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyBmQEGROqUSYkHzHmegUAj1TNrXf956DL8",
  authDomain: "full-belly-kids-run.firebaseapp.com",
  projectId: "full-belly-kids-run",
  storageBucket: "full-belly-kids-run.appspot.com",
  databaseURL: "https://full-belly-kids-run-default-rtdb.firebaseio.com",
  messagingSenderId: "615172825869",
  appId: "1:615172825869:web:c5cee1305c58d6e02f4644",
  measurementId: "G-KBXP35DWLT"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.db = app.database()
  }

  info = () => this.db.ref('2021');
}

export default Firebase;