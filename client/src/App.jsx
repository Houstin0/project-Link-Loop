import React,{useState,useEffect} from 'react';
import { Routes, Route,useNavigate } from 'react-router-dom';
// 
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/LogIn';
import Messaging from './components/messaging/Messaging'
import Signup from './components/SignUp'; 
import Contact from './components/Conatact';
import About from './components/About';
import Footer from './components/Footer';


function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  const handleSignUp = (userData) => {
    setUser(userData)
    navigate('/')
  };

  const handleLogin = (userData) => {
    setUser(userData);
    navigate('/') 
  };
  const handleLogout = () => {
    console.log('Logging out from app');
    fetch('/logout', {
      method: 'DELETE',
    })
      .then(() => {
        setUser(null);
        console.log('Logout success from NavBar'); 
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };
  useEffect(() => {
    fetch("/check_session")
    .then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);


  
  
    return (
      <>
        <NavBar user={user} onLogout={handleLogout} onSignup={handleSignUp}/>
        <Routes>
          <Route path="/" element={user ? <Home user={user} onLogout={handleLogout} /> : <Home/>} />
          <Route path="/messaging" element={user ? <Messaging currentUser={user}/> : <Login onLogin={handleLogin} /> } />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignUp={handleSignUp} />} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
        <Footer/>

      </>
    );
}

export default App
