import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Profile({ user, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    fetch("https://link-loop-db.onrender.com/posts", {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="relative">
      <div
        role="status"
        className=" mt-5 mb-5 space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
      >
        {/* Dropdown button */}
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="fixed top-2 right-64 p-4 inline-block text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-900 rounded-lg text-sm p-1.5"
          type="button"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>

        {/* Dropdown menu */}
        <div
          id="dropdown"
          className={`z-10 fixed top-10 right-64 ${
            isDropdownOpen ? "block" : "hidden"
          } bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-900`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>

        <figure className="max-w-lg">
          <img
            className="h-auto max-w-full rounded-lg"
            src={user.profile_picture}
            alt={user.username}
          />
        </figure>

        <div className="w-full">
          <h1 className="text-5xl text-purple-700 font-extrabold dark:text-purple-700">
            {user.username}
          </h1>

          <p className="mb-3 text-gray-900 dark:text-gray-400">{user.bio}</p>
        </div>
        <span className="sr-only">Loading...</span>
      </div>

      <div className="grid grid-cols-2  md:grid-cols-4 gap-2">
        {posts.map((post) => (
          <div key={post.id}>
            <img
              className="h-full w-full rounded-lg"
              src={post.image_url}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Profile;
