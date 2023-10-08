import React,{useState,useEffect} from "react";
import Message from "./Message";


function MessageList({user,recipientId}) {
  const [messages,setMessages]=useState([])
  const [messageText,setMessageText]=useState('')

  const loadMessages = ()=>{
    fetch('api//messages?sender_id=${user.id}&recipient_id=${recipientId}')
    .then(r=>r.json())
    .then(data=>setMessages(data))
    .catch((error)=>{
      console.log('Error loading messages:', error)
    })
  }
  const sendMessage = ()=>{
    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: messageText,
        sender_id: user.id,
        recipient_id: recipientId,
      }),
    })
      .then(r=>r.json())
      .then((data) => {
        setMessageText('')
        loadMessages()
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  }
  useEffect(()=>{
    loadMessages()
  },[user.id,recipientId])

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default MessageList;
