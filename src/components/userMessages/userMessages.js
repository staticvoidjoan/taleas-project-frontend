import React, { useEffect } from "react"
import {useState } from "react"
import {db} from '../../firebase'
function ListUserMessages({user}) {

    const [messages, setMessageIds] = useState([])
    useEffect(() => {

    }, [])

    const getApplicantChats = async (applicantId) => {
    try {
        // Assuming you have a collection named 'chats'
        const snapshot = await db.collection('chats').where('chatId', '>=', `${applicantId}_`).where('chatId', '<=', `${applicantId}_\uf8ff`).get();

        if (snapshot.empty) {
        // No chats found with the applicantId
        return [];
        }

        const chats = [];
        snapshot.forEach((doc) => {
        const chatData = doc.data();
        // You can add the chat data to your chats array
        chats.push({
            id: doc.id, // Chat ID
            name: doc.name
            // Other chat data fields
            // ...
        });
        });

        return chats;
    } catch (error) {
        console.error('Error fetching chats:', error);
        return [];
    }
    };

    useEffect (() => {
        getApplicantChats(user._id)
    },[])

    return (
        <div>
            <h1>User Messages</h1>
            <div>
                {messages.map((message) => (
                    <div>
                        <h2>{message.name}</h2>
                    </div>
                ))}
            </div>

        </div>
    )
}
export default ListUserMessages