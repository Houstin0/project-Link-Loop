import React from "react";

function UserList({ onSelectUser }) {
  // Fetch the list of users from your API
  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    // Add more users here
  ];

  return (
    <div className="user-list">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => onSelectUser(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
