import React, { createContext, useContext, useState, useEffect } from 'react';
import { account, getCurrentUser } from '../lib/appwrite'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

// Create the context
const UserContext = createContext();

// Create a custom hook for easy access to the context
export function useUser() {
  return useContext(UserContext);
}

// Create the provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch user data', err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null); // Clear user state on logout
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}
