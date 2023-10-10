import React, { useState } from "react";

function EditMessage({ id, text, onUpdateMessage }) {
  const [messageText, setMessageText] = useState(text);

  function handleFormSubmit(e) {
    e.preventDefault();

    fetch(`/messages/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: messageText,
      }),
    })
      .then((r) => r.json())
      .then((updatedMessage) => onUpdateMessage(updatedMessage));
  }

  return (
    <form class="edit-message" onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="body"
        autoComplete="off"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <input type="submit" value="Save" />
    </form>
  );
}

export default EditMessage;
