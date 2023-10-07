import React,{useState,useEffect} from 'react';
import { Routes, Route,useNavigate } from 'react-router-dom';
// 
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/LogIn';
import Messaging from './components/messaging/Messaging'
import Signup from './components/SignUp'; 
import Chat from './components/chat/Chat'

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  const handleSignUp = (userData) => {
    setUser(userData)
    navigate('/home')
  };

  const handleLogin = (userData) => {
    setUser(userData);
    navigate('/home') 
  };
  const handleLogout = () => {
      fetch("/logout", {
        method: "DELETE",
      })
      .then(() =>{
        setUser(null)
        navigate('/')
      })
      .catch((error) => {
        console.log('Logout error:', error);
      });
    }
    useEffect(() => {
      
      fetch('/check_session')
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {

            navigate('/')
            return null
          }
        })
        .then((user) => {
          if (user) {
            setUser(user);
          }
        })
        .catch(() => {
          console.log('User session check error');
        });
    }, [navigate]);
  
  
    return (
      <>
        <NavBar user={user} onLogout={handleLogout} onSignup={handleSignUp}/>
        <Routes>
          <Route path="/home" element={user ? <Home /> : <Login onLogin={handleLogin} />} />
          <Route path="/messaging" element={user ? <Messaging currentUser={user}/> : <Login onLogin={handleLogin} /> } />
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignUp={handleSignUp} />} />
        </Routes>
      </>
    );
}

export default App
