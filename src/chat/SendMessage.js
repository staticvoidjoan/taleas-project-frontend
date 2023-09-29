import React, { useState } from 'react';
import { db } from '../firebase'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { useParams } from 'react-router-dom';
import "./sendMessage.css"


const SendMessage = ({scroll , user }) => {
  const [input, setInput] = useState('');
  const {chatId} = useParams();
  const sendMessage = async (e) => {
    e.preventDefault()
    if (input === '') {
        alert('Please enter a valid message')
        return
    }
    
    await addDoc(collection(db, 'chats'), {
        text: input,
        name: user.name || user.companyName,
        uid: user._id,
        timestamp: serverTimestamp(),
        chatId : chatId

    })
    setInput('')
    scroll.current.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <form onSubmit={sendMessage} className="form">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input"
        type='text'
        placeholder='Message'
      />
      <button className="button" type='submit'>
        Send
      </button>
    </form>
  );
};

export default SendMessage;