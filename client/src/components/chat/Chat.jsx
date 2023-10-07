import React, { useState } from "react";
import UserList from "./UseList"; // You'll need to create this component
import Conversation from "./Conversation"; // You'll need to create this component
import NewMessage from "../messaging/NewMessage"
function Chat({ currentUser , onAddMessage}) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat">
      <UserList onSelectUser={setSelectedUser} />
      <Conversation currentUser={currentUser} selectedUser={selectedUser} />
      <NewMessage currentUser={currentUser} selectedUser={selectedUser} onAddMessage={onAddMessage} />
    </div>
  );
}

export default Chat;
