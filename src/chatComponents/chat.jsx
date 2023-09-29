import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./sendMessage";

import { db } from "../firebase";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
  querySnapshot,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const { postId } = useParams;

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("postId", "==", postId),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <div></div>
    </>
  );
};

export default Chat;
