import React, { useRef } from 'react';
import { db } from '../firebase';
import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Message from './Message';
import SendMessage from './SendMessage';
import './chat.css';
import { Timestamp } from 'firebase/firestore'; // Import the Timestamp object from Firebase

function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const { chatId } = useParams();

  useEffect(() => {
    const q = query(
      collection(db, 'chats'),
      where('chatId', '==', chatId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];

      querySnapshot.forEach((doc) => {
        const messageData = { id: doc.id, ...doc.data() };
        messagesData.push(messageData);
      });

      setMessages(messagesData);
    });

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  const renderMessagesByDate = () => {
    let currentDate = null;
    return messages.map((message) => {
      const messageDate = message.timestamp instanceof Timestamp
        ? new Date(message.timestamp.toMillis()).toLocaleDateString()
        : new Date(message.timestamp).toLocaleDateString();

      // Check if the message's date is different from the current date
      if (messageDate !== currentDate) {
        currentDate = messageDate;
        return (
          <div key={messageDate} className="message-date">
            {messageDate}
          </div>
        );
      }

      return (
        <Message key={message.id} message={message} user={user} />
      );
    });
  };

  return (
    <div className="chatApp">
      <main className="main">
        {renderMessagesByDate()}
      </main>
      <SendMessage user={user} scroll={scroll} />
      <span ref={scroll}></span>
    </div>
  );
}

export default Chat;
