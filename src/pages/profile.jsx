import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // If using react-router for dynamic user profiles
import { databases, appwriteConfig } from "../lib/appwrite"; // import necessary functions
import { Query } from "appwrite";
import Loader from "../components/loader";

export default function Profile() {
  const { userId } = useParams(); // Assuming you're passing userId via URL params for viewing other profiles
  const [profileUser, setProfileUser] = useState(null); // Profile's owner (could be different from loggedInUser)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown for options like sign out
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Fetch profile data and posts when component mounts or when userId changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch profile user's data
        const userResponse = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          [Query.equal("$id", userId)] // Get user details for this profile
        );

        setProfileUser(userResponse.documents[0]);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchUserProfile();
  }, [userId]); // Re-run effect when userId changes

  if (!profileUser) {
    return <Loader />;
  }

  return (
    <div className="relative">
      <div
        role="status"
        className="mt-5 mb-5 space-y-8 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
      >
        {/* Dropdown button */}
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="fixed top-2 right-64 p-4 inline-block text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-900 rounded-lg text-sm"
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
                Sign out
              </a>
            </li>
          </ul>
        </div>

        {/* Profile picture and details */}
        <figure className="max-w-lg">
          <img
            className="h-auto max-w-full rounded-lg"
            src={profileUser.imageUrl}
            alt={profileUser.name}
          />
        </figure>

        <div className="w-full">
          <h1 className="text-5xl text-purple-800 font-extrabold">
            {profileUser.name}
          </h1>

          <p className="mb-3 text-gray-900 dark:text-gray-400">
            {profileUser.bio}
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {profileUser.posts.length ? (
          profileUser.posts.map((post) => (
            <div key={post.$id}>
              <img
                className="h-full w-full rounded-lg"
                src={post.imageUrl}
                alt=""
              />
            </div>
          ))
        ) : (
          <p>No posts found for this user.</p>
        )}
      </div>
    </div>
  );
}
