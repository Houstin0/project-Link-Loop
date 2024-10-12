import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Posts from "../components/postsCard";
import { getAllUsers } from "../lib/appwrite";
import SideNavbar from "../components/sideNavbar";

function Dashboard() {

  const [allUsers, setAllUsers] = useState([]);



  useEffect(() => {
    // Fetch posts when the component mounts
    async function fetchUsers() {
      const fetchedUsers = await getAllUsers();
      setAllUsers(fetchedUsers);
    }

    fetchUsers();
  }, []);

  return (
    <>
      <SideNavbar />

      <aside
        id="cta-button-sidebar"
        className="hidden md:block fixed top-0 right-0 z-10 md:w-12 xl:w-64 h-screen transition-transform -translate-y-full sm:translate-y-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-black border-l-2 border-purple-100 dark:border-l dark:border-purple-400">


          <div className="">
            <h2 className="flex justify-center p-2 font-semibold dark:text-white ">
              Make New Friends
            </h2>
            <ul className="space-y-2 font-medium">
              {allUsers.map((user) => (
                <div key={user.$id}>
                  <li>
                    <Link to={`/profile/${user.$id}`}>
                    <div className="flex items-center">
                      <div className="relative cursor-pointer">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={user.imageUrl}
                          alt={user.name}
                        />
                        <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-purple-800 hover:underline dark:text-purple-400 hover:text-black dark:hover:text-white">
                          {user.name}
                        </p>
                      </div>

                      <div
                        // onClick={() => handleFriendshipCreate(user.id)}
                        className="cursor-pointer"
                      >
                        <svg
                          className="w-5 h-5 text-gray-800 dark:text-gray-100"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                        </svg>
                      </div>
                    </div>
                    </Link>

                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="fixed lg:left-64 lg:right-64 max-h-screen overflow-y-auto scrollbar-hide bg-gray-50 dark:bg-black">
        <div className="lg:w-[700px] mx-auto ">
          <Posts />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
