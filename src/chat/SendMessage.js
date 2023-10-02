import React, { useState, useRef } from 'react';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import './sendMessage.css';

const SendMessage = ({ scroll, user }) => {
  const [input, setInput] = useState('');
  const { chatId } = useParams();
  const inputRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a valid message');
      return;
    }

    await addDoc(collection(db, 'chats'), {
      text: input,
      name: user.name || user.companyName,
      uid: user._id,
      timestamp: serverTimestamp(),
      chatId: chatId,
    });

    setInput('');

    // Reset the textarea height to its default value
    inputRef.current.style.height = 'auto';

    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    // Set a maximum height of 200px
    const maxHeight = 200;
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, maxHeight)}px`;
  };

  return (
    <form onSubmit={sendMessage} className="sendMessage-form">
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        className="sendMessage-input"
        placeholder="Message"
        style={{ maxHeight: '100px' }}
      />
      <button className="sendMessage-button" type="submit">
        Send
      </button>
    </form>
  );
};

export default SendMessage;
