import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//
import Signup from "./components/SignUp";
import Login from "./components/LogIn";
import Home from "./components/Home";

import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";
import Cookies from "js-cookie";

import Inbox from "./components/Inbox";
import DarkModeSwitcher from "./components/DarkModeSwitcher";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(!!Cookies.get("access_token"));
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleSignUp = () => {
    setLoggedIn(true);
  };

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/home");
  };
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      // Parse the JSON string to an object
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);
  const handleLogout = () => {
    // Remove the access token cookie
    Cookies.remove("access_token");
    // Remove userData from localStorage
    localStorage.removeItem("userData");
    setLoggedIn(false);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/signup"
          element={<Signup onSignUp={handleSignUp} onLogin={handleLogin} />}
        />

        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <Home user={userData} onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route path="/inbox" element={<Inbox user={userData} />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* <DarkModeSwitcher/> */}
      {/* <Footer /> */}
    </>
  );
}

export default App;
