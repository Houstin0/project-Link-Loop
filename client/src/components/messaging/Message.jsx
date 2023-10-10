import React, { useState } from "react";
import EditMessage from "./EditMessage";

function Message({ message, currentUser, onMessageDelete, onUpdateMessage }) {
  const [isEditing, setIsEditing] = useState(false);

  const { id, username, text, created_at: createdAt } = message;

  const timestamp = new Date(createdAt).toLocaleTimeString();

  const isCurrentUser = currentUser.username === username;

  function handleDeleteClick() {
    fetch(`/messages/${id}`, {
      method: "DELETE",
    });

    onMessageDelete(id);
  }

  function handleUpdateMessage(updatedMessage) {
    setIsEditing(false);
    onUpdateMessage(updatedMessage);
  }

  return (
    <li>
      <span class="user">{username}</span>
      <span class="time">{timestamp}</span>
      {isEditing ? (
        <EditMessage
          id={id}
          text={text}
          onUpdateMessage={handleUpdateMessage}
        />
      ) : (
        <p>{text}</p>
      )}
      {isCurrentUser ? (
        <div class="actions">
          <button onClick={() => setIsEditing((isEditing) => !isEditing)}>
            <span role="img" aria-label="edit">
              ✏️
            </span>
          </button>
          <button onClick={handleDeleteClick}>
            <span role="img" aria-label="delete">
              🗑
            </span>
          </button>
        </div>
      ) : null}
    </li>
  );
}

export default Message;
