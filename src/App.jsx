import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Login from './pages/(Auth)/logIn';
import Dashboard from './pages/dashBoard';
import ProtectedRoute from './components/protectedRoute';
import Signup from './pages/(Auth)/signUp';
import CreatePost from './pages/createPost';
import Profile from './pages/profile';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/create-post',
    element: (
      <ProtectedRoute>
        <CreatePost />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile/:userId',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  
]);

function App() {
  return (
    
      <RouterProvider router={router} />
    
  );
}

export default App;
