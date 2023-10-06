import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

function LogIn(){
    const[username,setUsername]=useState("")
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
        
    //     fetch('/api/check_session').then((response) => {
    //         if (response.ok) {
    //           setLoggedIn(true); // User is already logged in
    //         }
    //       })
    //   }, []);


    function handleLogin(e){
        e.preventDefault()
        fetch("/api/login",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({username,password}),
        })
        .then(response=> {
            if (response.status === 200){
                setLoggedIn(true)
                navigate('/')
            }else{
                alert('Login error')
            }
        })
        .catch((error) => {
            console.error('Login error:', error);
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
          </form>
        </div>
      );
}

export default LogIn 