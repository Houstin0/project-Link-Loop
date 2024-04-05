import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../App.css";

function Posts({ user }) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(false);

  const [dropdownStates, setDropdownStates] = useState([]);

  // Function to toggle the dropdown for a specific message
  const toggleDropdown = (postId) => {
    setDropdownStates((prevStates) => {
      const index = prevStates.findIndex((state) => state.postId === postId);

      if (index !== -1) {
        // Toggle the isOpen state for the specific message
        const newStates = [...prevStates];
        newStates[index] = { postId, isOpen: !newStates[index].isOpen };
        return newStates;
      } else {
        // If the state for the message doesn't exist, create a new one with isOpen set to true
        return [...prevStates, { postId, isOpen: true }];
      }
    });
  };


  function fetchPosts() {
    fetch("https://link-loop-db.onrender.com/posts", {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }

  function fetchComments() {
    fetch("https://link-loop-db.onrender.com/comments", {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, []);

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const [confirmDeletePost, setConfirmDeletePost] = useState(null);

  const handleDeletePost = (postId) => {
    // Set postId to confirm deletion
    setConfirmDeletePost(postId);
  };

  const handleConfirmDelete = () => {
    // Close the confirmation dialog
    setConfirmDeletePost(null);

    if (confirmDeletePost !== null) {
      // User confirmed deletion
      fetch(`https://link-loop-db.onrender.com/posts/${confirmDeletePost}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            // Post successfully deleted
            fetchPosts();
          } else {
            // Handle error, e.g., show an error message
            console.error("Failed to delete post");
          }
        })
        .catch((error) => {
          console.error("Error while deleting post:", error);
        });
    }
  };

  const handleCancelDelete = () => {
    // User canceled deletion
    setConfirmDeletePost(null);
  };

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          role="status"
          className="relative shadow mb-4 space-y-8 md:space-y-0 md:space-x-4 rtl:space-x-reverse md:flex md:items-center dark:bg-gray-900"
        >
          
          <button
            onClick={() => toggleDropdown(post.id)}
            id={`dropdownMenuIconButton_${post.id}`}
            data-dropdown-toggle={`dropdownDots_${post.id}`}
            data-dropdown-placement="bottom-start"
            className="absolute top-2 right-2 p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray=100 focus:ring-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
            type="button"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 4 15"
            >
              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </button>
          <div
            id={`dropdownDots_${post.id}`}
            className={`absolute top-8 right-2 z-10 ${
              dropdownStates.find((state) => state.postId === post.id)?.isOpen
                ? "block"
                : "hidden"
            } bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-900`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconButton"
            >
              {user && post.owner.id === user.id && (
                <li>
                  <a
                    href="#"
                    onClick={() => handleDeletePost(post.id)}
                    className="block px-4 py-2 text-gray-900 hover:bg-gray-300 hover:text-red-500 hover:no-underline dark:hover:bg-gray-600 dark:hover:text-gray-100"
                  >
                    Delete
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="custom-height sm:w-full md:w-full lg:w-full xl:w-full flex items-center justify-center bg-gray-1000 rounded  dark:bg-gray-900">
            <img
              className="rounded-t-lg object-cover custom-height   "
              src={post.image_url}
              alt={post.caption}
            />
          </div>
          <div className="mt-4 mb-6 w-full pl-2">
            <div className="flex items-center ">
              <div className="relative">
                <img
                  className="w-10 h-10 rounded-full"
                  src={post.owner.profile_picture}
                  alt={post.owner.username}
                />
                <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
              <div className="flex flex-col mb-2">
                <span className="text-sm text-purple-700 font-extrabold ml-2 ">
                  {post.owner.username}
                </span>
                <span className=" ml-4 text-xs text-gray-900 dark:text-gray-100">
                  Location or sm
                </span>
              </div>
            </div>
            <p className="mb-3 text-gray-900 dark:text-gray-100">
              {post.caption}
            </p>

            {comments
              .filter((comment) => comment.post_id === post.id)
              .slice(0, visibleComments[post.id] ? comments.length : 2)
              .map((comment) => (
                <div key={comment.id} role="status" className="max-w-sm ">
                  <p className=" text-base text-gray-900 dark:text-gray-100">
                    <a
                      href="#"
                      className="font-bold text-purple-700 hover:text-gray-900  dark:text-purple-700 dark:hover:text-gray-100 hover:underline"
                    >
                      {comment.commenter?.username}
                    </a>
                    {"    "}
                    {comment.content}
                  </p>
                </div>
              ))}

            {comments.filter((comment) => comment.post_id === post.id)
              .length === 0 && <p className="text-gray-900 dark:text-gray-100 ">No comments yet.</p>}
            <p
              className="text-blue-700 cursor-pointer "
              onClick={() => toggleComments(post.id)}
            >
              {visibleComments[post.id]
                ? "Less comments.."
                : "More comments..."}
            </p>

            <span className="sr-only">Loading...</span>
          </div>
          
        </div>
      ))}

      {confirmDeletePost !== null && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p>Are you sure you want to delete this post?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Posts;
