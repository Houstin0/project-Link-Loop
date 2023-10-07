import React, { useEffect, useState } from "react";

function Conversation({ currentUser, selectedUser }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (currentUser && selectedUser) {
     
      fetch(`/api/messages?user1=${currentUser.id}&user2=${selectedUser.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((fetchedMessages) => setMessages(fetchedMessages))
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
    }
  }, [currentUser, selectedUser]);

  return (
    <div className="conversation">
      <h2>Conversation with {selectedUser ? selectedUser.name : ""}</h2>
      <ul>
      {messages.map((message) => (
    <li
      key={message.id}
      className={`message ${message.sender_id === currentUser.id ? "sent" : "received"}`}
    >
      {/* Check if the message is sent by the current user */}
      {message.sender_id === currentUser.id ? (
        <span className="sent-message">
          {message.text}
        </span>
      ) : (
        <span className="received-message">
          {message.text}
        </span>
      )}
    </li>
  ))}
      </ul>
    </div>
  );
}
export default Conversation;
