import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesContainerRef = useRef(null);
  
  // Replace this with your actual user ID retrieval method
  const user_id = 123; // Replace with the user's actual ID

  useEffect(() => {
    // Fetch user's messages from the server
    fetch('/api/messages')
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error('Error fetching messages:', error));
  }, []);

  // Scroll to the bottom of the message container when new messages are added
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    // Send a new message to the server
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newMessage, recipient_id: user_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages([...messages, data]);
        setNewMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <>
    <h2>Messaging</h2>
    <div className="message-container" ref={messagesContainerRef}>
      <div className="message-list">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.recipient_id === user_id ? 'received' : 'sent'}`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
    </>
  );
}

export default Messaging;
