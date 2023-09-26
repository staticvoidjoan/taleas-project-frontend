import React, { useState } from "react";
import firebase from "firebase";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const FirebaseSignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setDoc(doc(db, "users", user.uid), {
        email: email,
        userId: user.uid,
        timestamp: new Date(),
      });

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
};

export default FirebaseSignUp;
