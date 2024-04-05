import  { useState } from "react";
import { useNavigate , NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "./NavBar";

function SignUp({ onSignUp ,onLogin,userData}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile_picture, setProfilePicture] = useState("");
  const navigate = useNavigate();

 
  const handleSignUp = async () => {
    try {
      const response = await fetch("https://link-loop-db.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profile_picture, username, email, password }),
      });

      if (response.ok) {
        // Trigger the onSignup callback
        onSignUp();

        // Use the same login functionality from Login.jsx
        const loginResponse = await fetch("https://link-loop-db.onrender.com/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=password&username=${username}&password=${password}`,
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          // Save the access token in a cookie
          Cookies.set("access_token", loginData.access_token);

          // Trigger the onLogin callback
          onLogin();

          // Redirect the user to the home page or perform any other necessary actions
          // You can customize the path as needed
        } else {
          // Handle login error
          console.error("Login failed:", loginData.detail);
        }
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <>
    <NavBar user={userData} />
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-5">
        <div className="w-full bg-gray-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-100">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="profile_picture"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Profile picture url
                </label>
                <input
                  onChange={(e) => setProfilePicture(e.target.value)}
                  type="profile_picture_url"
                  name="profile_picture_url"
                  id="profile_picture_url"
                  value={profile_picture}
                  className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="URL"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User Name
                </label>
                <input
                  type="username"
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  id="username"
                  value={username}
                  placeholder="username"
                  className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder=""
                  className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <button
                type="button"
                onClick={handleSignUp}
                className="w-full text-gray-100 bg-purple-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-gray-900 dark:bg-purple-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <NavLink to ="/login"
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default SignUp;
