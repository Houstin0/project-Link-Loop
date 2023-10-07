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
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>

          <footer className="bg-violet rounded-lg shadow dark:bg-violet-900 m-4">
              <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                  <div class="sm:flex sm:items-center sm:justify-between">
                      <a href="/home" class="flex items-center mb-4 sm:mb-0">
                          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Link Loop</span>
                      </a>
                      <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                          <li>
                              <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                          </li>
                          <li>
                              <a href="/contact" class="hover:underline">Contact</a>
                          </li>
                      </ul>
                  </div>
                  <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                  <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/home" class="hover:underline">Link Loop™</a>. All Rights Reserved.</span>
              </div>
          </footer>


      </>
    );
}

export default App
