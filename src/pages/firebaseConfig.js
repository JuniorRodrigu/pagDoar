
import {getFirestore} from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCEZTV3TnxRBdtx7NqzT5-4AX7zsXUZL6E",
  authDomain: "doarcao-cd553.firebaseapp.com",
  projectId: "doarcao-cd553",
  storageBucket: "doarcao-cd553.appspot.com",
  messagingSenderId: "722498126350",
  appId: "1:722498126350:web:81ece1210c1784661a325f",
  measurementId: "G-4RCRGJ5JRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;