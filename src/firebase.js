  import { initializeApp } from "firebase/app";
  import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
  } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  import { getStorage } from "firebase/storage";

  const firebaseConfig = {
    apiKey: "AIzaSyBT5dFiOqKeu5UUHQWRqi6DpYrBgh35YNA",

    authDomain: "chat-firebase-d8581.firebaseapp.com",

    projectId: "chat-firebase-d8581",

    storageBucket: "chat-firebase-d8581.appspot.com",

    messagingSenderId: "485713622910",

    appId: "1:485713622910:web:c5316c3f6bfcd83a64e52f",

    measurementId: "G-9EPWJH9TVD",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  export { storage, app, db, auth };
