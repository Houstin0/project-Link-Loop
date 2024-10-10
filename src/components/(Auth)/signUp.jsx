import { useState } from "react";
import { useAuth } from "../../lib/appwrite";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, error, loading } = useAuth();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      setShowPassword(false);
    }, 1500);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showPassword);
    setTimeout(() => {
      setShowConfirmPassword(false);
    }, 1500);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    signup(name, username, email, password);
  };

  return (
    <>
      {/* Signup Form */}
      <section className="bg-white dark:bg-black h-screen flex items-center justify-center">
        <div className="py-4 px-8 mx-auto max-w-2xl lg:py-8 rounded-xl shadow dark:border bg-gray-800 dark:border-gray-700">
          <h1 className="mb-2 text-lg text-center font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-700 md:text-2xl">
            Sign up for an account
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSignup}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Full Name
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-e-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-1 flex items-center text-sm leading-5"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <img
                        src="/icons/eye.gif"
                        alt="eye"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-1 flex items-center text-sm leading-5"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <img
                        src="/icons/eye.gif"
                        alt="eye"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="my-4 w-full text-white bg-gradient-to-r from-purple-600 to-pink-700 hover:bg-gradient-to-l font-bold rounded-full text-lg px-5 py-2.5 text-center"
              disabled={loading}
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08146 50.5908C9.08146 73.2891 27.3017 91.5094 50 91.5094C72.6983 91.5094 90.9185 73.2891 90.9185 50.5908C90.9185 27.8924 72.6983 9.67218 50 9.67218C27.3017 9.67218 9.08146 27.8924 9.08146 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5532C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7237 75.2124 7.41289C69.5422 4.10206 63.2754 1.94025 56.7221 1.05115C51.7666 0.367443 46.7659 0.446843 41.8401 1.27852C39.3605 1.69399 37.8652 4.19778 38.5023 6.62326C39.1395 9.04874 41.6236 10.5145 44.0962 10.1343C47.9246 9.48029 51.8299 9.44009 55.6837 10.0239C60.8788 10.7995 65.8413 12.7346 70.2646 15.7351C74.688 18.7357 78.4773 22.7471 81.374 27.5151C83.784 31.146 85.612 35.1584 86.7829 39.392C87.4291 41.7503 89.9423 43.1781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                  Signing up...
                </div>
              ) : (
                "Sign up"
              )}
            </button>
            <p className="text-sm font-light text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-white hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </section>

      {/* Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08146 50.5908C9.08146 73.2891 27.3017 91.5094 50 91.5094C72.6983 91.5094 90.9185 73.2891 90.9185 50.5908C90.9185 27.8924 72.6983 9.67218 50 9.67218C27.3017 9.67218 9.08146 27.8924 9.08146 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5532C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7237 75.2124 7.41289C69.5422 4.10206 63.2754 1.94025 56.7221 1.05115C51.7666 0.367443 46.7659 0.446843 41.8401 1.27852C39.3605 1.69399 37.8652 4.19778 38.5023 6.62326C39.1395 9.04874 41.6236 10.5145 44.0962 10.1343C47.9246 9.48029 51.8299 9.44009 55.6837 10.0239C60.8788 10.7995 65.8413 12.7346 70.2646 15.7351C74.688 18.7357 78.4773 22.7471 81.374 27.5151C83.784 31.146 85.612 35.1584 86.7829 39.392C87.4291 41.7503 89.9423 43.1781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <p className="text-white text-3xl mt-4">Signing up...</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
