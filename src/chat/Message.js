import React from 'react';
import './message.css'; // Import the CSS file

const Message = ({ message, user }) => {
  const messageClass = message.uid === user._id ? 'sent' : 'received';

  return (
    <div>
      <div className={`message ${messageClass}`}>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
