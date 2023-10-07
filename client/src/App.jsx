import React,{useState,useEffect} from 'react';
import { Routes, Route,useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/LogIn';
import Messaging from './components/Messaging';
import Signup from './components/SignUp'; 

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
      // Make a GET request to check the user's session and update the user state
      fetch('/check_session')
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            // Handle the case when the user is not authenticated
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
        <NavBar user={user} onLogout={handleLogout}/>
        <Routes>
          <Route path="/home" element={user ? <Home /> : <Login onLogin={handleLogin} />} />
          <Route path="/messaging" element={user ? <Messaging /> : <Login onLogin={handleLogin} /> } />
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignUp={handleSignUp} />} />
        </Routes>
      </>
    );
}

export default App
