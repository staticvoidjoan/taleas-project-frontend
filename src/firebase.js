  import { initializeApp } from "firebase/app";
  import {
    getFirestore,
  } from "firebase/firestore";

  
  // Define the Firebase configuration object
  const firebaseConfig = {
    apiKey: "AIzaSyA84WWH34mZ2OtMYKv7f9lv5ytMW5oYrC4",
    authDomain: "ccrush-169b8.firebaseapp.com",
    projectId: "ccrush-169b8",
    storageBucket: "ccrush-169b8.appspot.com",
    messagingSenderId: "489390331709",
    appId: "1:489390331709:web:f67d54733c67e033c3d754",
    measurementId: "G-6YTP8KD4HN"
  };
  
  // Now you can use the firebaseConfig object
  console.log(firebaseConfig);
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


  export { db };
