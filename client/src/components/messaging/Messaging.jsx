import React, { useEffect, useState } from "react";
import Search from "./Search";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";
import Chat from "../chat/Chat";

function Messaging({currentUser}) {

  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/messages")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((messages) => setMessages(messages))
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

  function handleAddMessage(newMessage) {
    setMessages([...messages, newMessage]);
  }

  function handleDeleteMessage(id) {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  }

  function handleUpdateMessage(updatedMessageObj) {
    const updatedMessages = messages.map((message) => {
      if (message.id === updatedMessageObj.id) {
        return updatedMessageObj;
      } else {
        return message;
      }
    });
    setMessages(updatedMessages);
  }

  const displayedMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="message-container">
    
      <Search search={search} onSearchChange={setSearch} />
      <MessageList
        messages={displayedMessages}
        currentUser={currentUser}
        onMessageDelete={handleDeleteMessage}
        onUpdateMessage={handleUpdateMessage}
      />
      <NewMessage currentUser={currentUser} onAddMessage={handleAddMessage} />
      <Chat currentUser={currentUser}onAddMessage={handleAddMessage}/>
    </main>
  );
}

export default Messaging;
