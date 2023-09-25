import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBT5dFiOqKeu5UUHQWRqi6DpYrBgh35YNA",

  authDomain: "chat-firebase-d8581.firebaseapp.com",

  projectId: "chat-firebase-d8581",

  storageBucket: "chat-firebase-d8581.appspot.com",

  messagingSenderId: "485713622910",

  appId: "1:485713622910:web:c5316c3f6bfcd83a64e52f",

  measurementId: "G-9EPWJH9TVD",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
