import React, { useState } from 'react';

function SignUp({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile_picture_url,setProfilePictureUrl]=useState('')

  const handleSignUp = () => {
    const data = { username, email, password}

    if (profile_picture_url) {
      data.profile_picture_url = profile_picture_url;
    }

    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (response.status === 201) {
        onSignUp();
      } else {
        response.json().then(data => {
          alert(`Registration failed: ${data.error}`);
        });
      }
    })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
      <div>
          <label htmlFor="profile_picture_url">profile_picture_url</label>
          <input
            type="text"
            id="profile_picture_url"
            value={profile_picture_url}
            onChange={(e) => setProfilePictureUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
