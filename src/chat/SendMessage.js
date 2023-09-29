import React, { useState } from 'react';
import { db } from '../firebase'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { useParams } from 'react-router-dom';

const style = {
  form: `h-12 w-full max-w-[100vW] flex text-xl fixed bottom-0`,
  input: `w-full text-sm p-3 bg-white-900 text-black outline outline-black-500 outline-1`,
  button: `w-[15%] text-white text-sm bg-[#118C94] outline outline-[#118C94] outline-1`,
};

const SendMessage = ({scroll , user }) => {
  const [input, setInput] = useState('');
  const {chatId} = useParams();
  const sendMessage = async (e) => {
    e.preventDefault()
    if (input === '') {
        alert('Please enter a valid message')
        return
    }
    
    await addDoc(collection(db, 'messages'), {
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
    <form onSubmit={sendMessage} className={style.form}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={style.input}
        type='text'
        placeholder='Message'
      />
      <button className={style.button} type='submit'>
        Send
      </button>
    </form>
  );
};

export default SendMessage;