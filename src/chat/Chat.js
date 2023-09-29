import React, { useRef } from 'react'
import { db, } from '../firebase';
import {query, collection, where, orderBy, onSnapshot} from 'firebase/firestore';
import {useEffect} from 'react';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import Message from './Message';
import SendMessage from './SendMessage';
const style = {
    main: `flex flex-col p-[10px] overflow-auto mb-[40px] margin-top-[200px] margin-bottom-[60px] `,
  };

function Chat({user}) {
    const [messages, setMessages] = useState([])
    const scroll = useRef()
    const {chatId} = useParams()

    useEffect(() => {
        const q = query(collection(db, "chats"), where("chatId", "==", chatId), orderBy("timestamp", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messagess = [];
            querySnapshot.forEach((doc) => {
                messagess.push({id: doc.id, 
                  ...doc.data()});
                console.log({...doc.data(),id: doc.id})
            });
            setMessages(messagess);
            console.log(messagess)
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <>
        <main className={style.main}>
          {messages &&
            messages.map((message) => (
              <Message key={message.id} message={message} user={user}/>
            ))}
        </main>
              
        <SendMessage user={user} scroll={scroll} />
        <span ref={scroll}></span>
      </>
    )

}

export default Chat