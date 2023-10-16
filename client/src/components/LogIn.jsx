import { useState } from "react"
import { useNavigate } from 'react-router-dom';
function Login({onLogin}){
    const[username,setUsername]=useState("")
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    function handleLogin(e){
      e.preventDefault()
      fetch("/login",{
          method: "POST",
          headers:{
              "Content-Type":"application/json",
          },
          body: JSON.stringify({username,password}),
      })
      .then((response) => response.json())
      .then((user)=>{
        onLogin(user)
        // navigate('/')
    })
    
      .catch((error) => {
          console.log('Login error:', error);
        })
  }

    return(
        <section class="bg-white-50 dark:bg-black-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-black
                g-900 dark:text-black-900">
                    Link Loop   
                </a>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-black-900 md:text-2xl dark:text-black-900">
                            Log in to your account
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="username" class="block mb-2 text-sm font-medium text-red-900 dark:text-blue-900">Username</label>
                                <input type="username" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" 
                                value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-red-900 dark:text-blue-900">Password</label>
                                <input type="password" name="password" id="password" placeholder="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            {/* <div class="flex items-center justify-between">
                                <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div> */}
                            <button type="button" class="w-full text-black bg-violet-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover-bg-primary-700 dark:focus:ring-primary-800"
                            onClick={handleLogin}>Log in</button>
                            <p class="text-sm font-light text-violet-500 dark:text-violet-400">
                                Don’t have an account yet? <a href="/signup" class="font-medium text-blue-600 hover:underline dark:text-primary-500"
                                >Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
</section>

    )

}

export default Login 
