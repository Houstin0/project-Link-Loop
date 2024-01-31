import Posts from "./Posts";
import Profile from "./Profile";
import CreatePostForm from "./CreatePostForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import DarkModeSwitcher from "./DarkModeSwitcher";

function Home({ onLogout }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [user, setUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      // Parse the JSON string to an object
      const parsedUserData = JSON.parse(storedUserData);
      setUser(parsedUserData);
    }
  }, []);
  const navigateToProfile = () => {
    setShowProfile(true);
  };
  const navigateToPosts = () => {
    setShowProfile(false);
  };

  function fetchAllUsers() {
    fetch("/api/users", {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    })
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }

  useEffect(() => {
    fetchAllUsers();
  });

  const handleFriendshipCreate = async (clickedUserId) => {
    try {
      const response = await fetch("/api/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify({
          follower_id: user.id,
          following_id: clickedUserId,
          status: "pending",
        }),
      });
      if (response.ok) {
        alert("Friendship created successfully!");
        // You may want to update your UI or state to reflect the new friendship
      } else {
        console.error("Failed to create friendship");
      }
    } catch (error) {
      console.error("Error creating friendship:", error);
    }
  };

  const toggleCreatePost = () => {
    setShowCreatePost((prev) => !prev);
  };

  return (
    <>
      {windowWidth > 640 ? ( // Show sidebar on larger screens
        <>
          <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 sm:w-16 md:w-12 lg:w-32 xl:w-48 "
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <a href="/home" className="flex items-center ps-2.5 mb-5">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-6 me-3 sm:h-7"
                  alt="Logo"
                />

                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  Link Loop
                </span>
              </a>

              <ul className="space-y-2 font-medium">
                <DarkModeSwitcher />

                <li>
                  <button
                    onClick={toggleCreatePost}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:no-underline"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m14.707 4.793-4-4a1 1 0 0 0-1.416 0l-4 4a1 1 0 1 0 1.416 1.414L9 3.914V12.5a1 1 0 0 0 2 0V3.914l2.293 2.293a1 1 0 0 0 1.414-1.414Z" />
                      <path d="M18 12h-5v.5a3 3 0 0 1-6 0V12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Create Post
                    </span>
                  </button>
                </li>
                <li>
                  <a
                    href="/inbox"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:no-underline"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      3
                    </span>
                  </a>
                </li>
                <li>
                  {/* <a
                    href="/profile"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:no-underline"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                  </a> */}
                </li>

                <li>
                  <a
                    href=""
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:no-underline"
                    onClick={onLogout}
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                      />
                    </svg>

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Log out
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <aside
            id="cta-button-sidebar"
            class="fixed top-0 right-0 z-40 w-64 h-screen transition-transform -translate-y-full sm:translate-y-0 md:w-48 "
            aria-label="Sidebar"
          >
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              {showProfile ? (
                <button
                  onClick={navigateToPosts}
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap">Home</span>
                  <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    Pro
                  </span>
                </button>
              ) : (
                <button
                  onClick={navigateToProfile}
                  className="hover:no-underline "
                >
                  <div className="flex items-center mt-4 mb-6">
                    <div className="relative">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user.profile_picture}
                        alt={user.username}
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <span className="text-sm text-purple-700 font-extrabold ml-2 ">
                        {user.username}
                      </span>
                      <span className="text-xs ml-2 text-sm text-gray-900 dark:text-gray-100 hover:underline ">
                        View Your Profile
                      </span>
                    </div>
                  </div>
                </button>
              )}

              <div className="">
                <ul class="space-y-2 font-medium">
                  {allUsers.map((user) => (
                    <div key={user.id}>
                      <li>
                        <div className="flex items-center">
                          <div className="relative">
                            <img
                              className="w-10 h-10 rounded-full"
                              src={user.profile_picture}
                              alt={user.username}
                            />
                            <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-purple-700  truncate dark:text-purple-500 ">
                              {user.username}
                            </p>
                          </div>

                          <div
                            onClick={() => handleFriendshipCreate(user.id)}
                            className="cursor-pointer"
                          >
                            <svg
                              class="w-5 h-5 text-gray-800 dark:text-gray-100"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 18"
                            >
                              <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                            </svg>
                          </div>
                        </div>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </>
      ) : (
        // Show bottom navigation on smaller screens
        <div className="fixed-bottom-navbar">
          <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
              <a
                href="/home"
                data-tooltip-target="tooltip-home"
                className="inline-flex flex-col items-center justify-center px-4 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <svg
                  className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                <span className="sr-only">Home</span>
              </a>
              <div
                id="tooltip-home"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Home
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
              <a
                href="/inbox"
                data-tooltip-target="tooltip-inbox"
                className="inline-flex flex-col items-center justify-center px-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <svg
                  className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Inbox</span>
              </a>
              <div
                id="tooltip-inbox"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Inbox
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
              <div className="flex items-center justify-center">
                <a
                  href=""
                  data-tooltip-target="tooltip-new"
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                  <span className="sr-only">New item</span>
                </a>
              </div>
              <div
                id="tooltip-new"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Create new item
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
              <a
                href=""
                data-tooltip-target="tooltip-settings"
                className="inline-flex flex-col items-center justify-center px-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <svg
                  className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                  />
                </svg>
                <span className="sr-only">Settings</span>
              </a>
              <div
                id="tooltip-settings"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Settings
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
              <a
                href=""
                data-tooltip-target="tooltip-profile"
                className="inline-flex flex-col items-center justify-center px-4 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <svg
                  className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <span className="sr-only">Profile</span>
              </a>
              <div
                id="tooltip-profile"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Profile
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-2 sm:ml-8 md:ml-16 lg:ml-32 xl:ml-48 md:mr-48  bg-gray-100 dark:bg-gray-900">
        {showCreatePost && <CreatePostForm user={user} />}
        {showProfile ? <Profile user={user} /> : <Posts user={user} />}
      </div>
    </>
  );
}
export default Home;
