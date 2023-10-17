  import { initializeApp } from "firebase/app";
  import {
    getFirestore,
  } from "firebase/firestore";

  

  const firebaseConfig = {
    apiKey: "AIzaSyBB6Y-QPo4ZdSrhqTW1lTmKEYzYSAwOi60",
    authDomain: "careercrush-2b1aa.firebaseapp.com",
    projectId: "careercrush-2b1aa",
    storageBucket: "careercrush-2b1aa.appspot.com",
    messagingSenderId: "254547065330",
    appId: "1:254547065330:web:00d40269449df39eb7936b",
    measurementId: "G-2BX04600C8"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


  export { db };
