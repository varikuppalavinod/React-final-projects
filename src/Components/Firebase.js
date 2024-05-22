
// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDqWjSPkYaxf50bRLGZq7Ut5um6evXSp9o",
    authDomain: "expensetracker-89dc3.firebaseapp.com",
    databaseURL: "https://expensetracker-89dc3-default-rtdb.firebaseio.com",
    projectId: "expensetracker-89dc3",
    storageBucket: "expensetracker-89dc3.appspot.com",
    messagingSenderId: "1060410646874",
    appId: "1:1060410646874:web:559c7c68ac8aaa14495363",
    measurementId: "G-1Y2BSQLBZ6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, onValue };
