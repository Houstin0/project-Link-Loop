import React, { useState, useRef, useEffect } from "react";
// import Message from "./Message"

function MessageList({ user, recipientId, loadMessages, messages }) {
  const [messageText, setMessageText] = useState("");
  const messagesContainerRef = useRef();

  const sendMessage = () => {
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
      .then((r) => r.json())
      .then((data) => {
        setMessageText("");
        loadMessages();
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  };

  useEffect(() => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div class="message-container">
      <div class="messages" ref={messagesContainerRef}>
      <ul>
        {messages.map((message) => (
          <li key={message.id} class={message.sender_id === user.id ? "sent" : "received"}>
            <span class="user">{message.sender_id === user.id ? "You" : message.sender_name}:</span> {message.text}
            <span class="time">{message.created_at}</span>
          </li>
        ))}
      </ul>
    </div>  
      <form class="new-message" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Your message..."
        />
        <button type="submit" onClick={sendMessage}>
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageList;
