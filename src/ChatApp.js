import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Chat from './chat/Chat';
import ChatNavBar from './chat/Navbar';
import axios from 'axios';

function ChatApp({ loggedInUser,userRole }) {
  const [user, setUser] = useState(loggedInUser);
  const [talkingToEmployer, setTalkingToEmployer] = useState({});
  const [talkingToEmployee, setTalkingToEmployee] = useState({});
  const { chatId } = useParams();

  
  const checkWhoTalkingTo = async (chatId) => {
    const ids = chatId.split('_');
    if (loggedInUser._id === ids[0]) {
      //if equal to id[0] means he is applicant talking to a company
      const response = await axios.get(
        'https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/employer/' +
          ids[1]
      );
      setTalkingToEmployer(response.data.employer);
      console.log("talking to employer: " + talkingToEmployer.companyName)
    } else {
      const response = await axios.get(
        'https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/user/' +
          ids[0]
      );

      setTalkingToEmployee(response.data.user);
      console.log("talking to employee: " + talkingToEmployee)
    }
    //split the chat id first is applicant id second is company id
    //if loggedInUser._id === first then set user to second
    //else set user to first
  };

  useEffect(() => {
    console.log('logged in user', user);
    if (user) {
      checkWhoTalkingTo(chatId);
    }
  }, [loggedInUser]);


  
  return (
    <div>
      {user && (talkingToEmployee || talkingToEmployer) ? (
        
        talkingToEmployee ? (
          <ChatNavBar  employer={null} employee={talkingToEmployee} />
        ) : (
          <ChatNavBar  employer={talkingToEmployer} employee={null}/>
        )
      ) : (
        <h1>Loading</h1>
      )}
      {user ? <Chat user={user} /> : <h1>Loading</h1>}
    </div>
  );
}

export default ChatApp;
