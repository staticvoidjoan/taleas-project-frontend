import React, {useEffect} from 'react';
import {useState} from 'react';

import {useParams} from 'react-router-dom';
import Chat from './chat/Chat';



function ChatApp({loggedInUser}) {
    const [user, setUser] = useState(loggedInUser)
    useEffect(() => {
        console.log("logged in user", user)
    }, [loggedInUser])

    return (
        <div>
            {user ? <Chat user={user}/> : <h1>loading</h1> }
        </div>
    )
}

export default ChatApp