import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';

function Login({onLogin}){
    const[username,setUsername]=useState("")
    const [password, setPassword] = useState('');
    
    function handleLogin(){
        fetch("/api/login",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({username,password}),
        })
        .then(response=> {
            if (response.status === 200){
                fetchUserData()
                
            }else{
                alert('Login failed')
            }
        })
        .catch((error) => {
            console.error('Login error:', error);
          })
    }

    function fetchUserData(){
      fetch('/api/check_session')
      .then((response)=>{
        if (response.ok){
          return response.json()
        }else{
          alert ("User not authenticated")
        }
      })
      .then((user)=>{
        onLogin(user)
      })
      .catch((error)=>{
        console.error("User not authenticated:", error)
      })
    }
    return (
        <div>
          <h2>Login</h2>
          <form>
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="button" onClick={handleLogin}>
                Login
              </button>
            </div>
            <div>
                
                <Link to="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      );
}

export default Login 