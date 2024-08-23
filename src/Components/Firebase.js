
// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, remove, update } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBSCGMswFE4FDOLlmSRFNO6Uk1-ZuJ6w_o",
    authDomain: "expensetracker-2-e1820.firebaseapp.com",
    projectId: "expensetracker-2-e1820",
    storageBucket: "expensetracker-2-e1820.appspot.com",
    messagingSenderId: "486365468801",
    appId: "1:486365468801:web:1fad72ffba23b043ca1580",
    measurementId: "G-01BQ9DMC6M"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, onValue, remove, update };
