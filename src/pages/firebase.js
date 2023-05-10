// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);