import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesContainerRef = useRef(null);
  const [user_id, setUserId] = useState(null)
  
  function fetchUserData(){
    fetch('/api/check_session')
    .then((response)=>{
      if (response.ok){
        return response.json()
      }else{
        alert ("User not authenticated")
      }
    })
    .then((user)=>{
      setUserId(user.id);
    })
    .catch((error)=>{
      console.error("User not authenticated:", error)
    })}
   

  useEffect(() => {
    // Fetch user's messages from the server
    fetchUserData()
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

  const conversations = {};

  // Group messages into conversations
  messages.forEach((message) => {
    const otherUserId = message.recipient_id === user_id ? message.sender_id : message.recipient_id;

    if (!conversations[otherUserId]) {
      conversations[otherUserId] = [];
    }

    conversations[otherUserId].push(message);
  });

  return (
    <>
      <h2>Messaging</h2>
      <div className="message-container" ref={messagesContainerRef}>
        {Object.keys(conversations).map((otherUserId) => (
          <div key={otherUserId} className="conversation">
            <div className="conversation-header">
              <h3>User {otherUserId}</h3>
            </div>
            <div className="conversation-messages">
              {conversations[otherUserId].map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.recipient_id === user_id ? 'received' : 'sent'}`}
                >
                  <p>{message.text}</p>
                </div>
              ))}
            </div>
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
    </>
  );
}

export default Messaging;

