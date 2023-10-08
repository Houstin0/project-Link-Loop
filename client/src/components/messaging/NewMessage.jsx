import React, { useState } from "react";

function NewMessage({ currentUser, selectedUser, onAddMessage }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();


    fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_id: currentUser.id,
          recipient_id: selectedUser.id,
          text: text,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((newMessage) => {
          onAddMessage(newMessage);
          setText("");
        })
        .catch((error) => {
          // Handle the error, e.g., show an error message to the user
          console.log("Error:", error);
        });
  }

  return (
    <form className="new-message" onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        autoComplete="off"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default NewMessage;
