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
  const [displayedDate, setDisplayedDate] = useState(null);
  const scroll = useRef();
  const { chatId } = useParams();

  useEffect(() => {
    const q = query(
      collection(db, 'chats'),
      where('chatId', '==', chatId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
       let messagess = [];
      // let prevDate = null;

      querySnapshot.forEach((doc) => {
        const messageData = { id: doc.id, ...doc.data() };
        messagess.push(messageData);

        // Extract the date part from the timestamp
        // const date = messageData.timestamp instanceof Timestamp
        //   ? messageData.timestamp.toMillis()
        //   : messageData.timestamp;

        // Convert to a date object
        //const messageDate = new Date(date).toLocaleDateString();

        // If the message date is different from the previously displayed date, update it
        // if (messageDate !== prevDate) {
        //   setDisplayedDate(messageDate);
        //   prevDate = messageDate;
        // }
      });

      setMessages(messagess);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="chatApp">
      <main className="main">
        {displayedDate && <div className="message-date">{displayedDate}</div>}
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} user={user} />
          ))}
      </main>
      <SendMessage user={user} scroll={scroll} />
      <span ref={scroll}></span>
    </div>
  );
}

export default Chat;
