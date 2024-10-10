import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import { getPosts } from "../lib/appwrite"; // Import the getPosts function

function Posts() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [visibleComments, setVisibleComments] = useState({});
  const [dropdownStates, setDropdownStates] = useState([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    async function fetchPosts() {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    }

    fetchPosts();
  }, []); // Empty dependency array to run only once when the component mounts

  const toggleDropdown = (postId) => {
    setDropdownStates((prevStates) => {
      const index = prevStates.findIndex((state) => state.postId === postId);
      if (index !== -1) {
        const newStates = [...prevStates];
        newStates[index] = { postId, isOpen: !newStates[index].isOpen };
        return newStates;
      } else {
        return [...prevStates, { postId, isOpen: true }];
      }
    });
  };

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  console.log(posts);
  return (
    <div className="pb-20 p-4 md:pb-6 bg-gray-50 dark:bg-black ">
    {posts.map((post) => (
      <>
        <div
          key={post.$id}
          role="status"
          className="relative rounded-xl rtl:space-x-reverse bg-gray-50 dark:bg-black shadow-sm mb-8 border-2 border-purple-200 dark:border dark:border-purple-400"
        >
          <div className="relative w-full items-center max-h-[420px] lg:aspect-[16/9] overflow-hidden rounded-t-2xl bg-gray-50 dark:bg-black">
            <img
              className="w-full h-full object-fill object-center lg:object-contain rounded-t-2xl border-b-2 border-purple-100 dark:border-b dark:border-purple-400"
              src={post.imageUrl}
              alt={post.caption}
            />
          </div>
  
          <div className="mt-4 mb-6 pl-2">
            <button
              onClick={() => toggleDropdown(post.$id)}
              id={`dropdownMenuIconButton_${post.$id}`}
              data-dropdown-toggle={`dropdownDots_${post.$id}`}
              data-dropdown-placement="bottom-start"
              className="absolute bottom-14 right-2 p-2 text-sm font-medium text-center text-black bg-purple-200 rounded-lg hover:bg-purple-400 focus:ring-4 focus:outline-none dark:text-gray=100 focus:ring-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
              type="button"
            >
              <svg
                className="w-4 h-4 text-black dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 4 15"
              >
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>
            <div
              id={`dropdownDots_${post.$id}`}
              className={`absolute top-8 right-2 z-10 ${
                dropdownStates.find((state) => state.postId === post.id)?.isOpen
                  ? "block"
                  : "hidden"
              } bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-900`}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                {user && post.creator.$id === user.$id && (
                  <li>
                    <a
                      href="#"
                      // onClick={() => handleDeletePost(post.id)}
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-300 hover:text-red-500 hover:no-underline dark:hover:bg-gray-600 dark:hover:text-gray-100"
                    >
                      Delete
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <img className="w-10 h-10 rounded-full" src={post.creator.imageUrl} alt={post.creator.username} />
                <span className="bottom-0 left-7 absolute w-4 h-4 sm:w-3.5 sm:h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
              <div className="flex flex-col mb-2">
                <span className="text-sm text-purple-800 font-bold ml-2 dark:text-purple-400 hover:text-black dark:hover:text-white">
                  {post.creator.username}
                </span>
                <span className="ml-4 text-xs text-gray-900 dark:text-gray-100">Location or sm</span>
              </div>
            </div>
            <p className="pb-4 text-gray-900 dark:text-gray-100">{post.caption}</p>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
  

      </>
    ))}
  </div>
  

  
  );
}

export default Posts;

// import { useState, useEffect } from "react";
// import { getPosts } from "../lib/appwrite"

// function Posts({ user }) {
//   const [posts, setPosts] = useState([]);
//   const [visibleComments, setVisibleComments] = useState(false);
//   const [dropdownStates, setDropdownStates] = useState([]);

//   useEffect(() => {
//     // Fetch posts when the component mounts
//     async function fetchPosts() {
//       const fetchedPosts = await getPosts();
//       setPosts(fetchedPosts);
//     }

//     fetchPosts();
//   }, []);

//   // Function to toggle the dropdown for a specific message
//   const toggleDropdown = (postId) => {
//     setDropdownStates((prevStates) => {
//       const index = prevStates.findIndex((state) => state.postId === postId);

//       if (index !== -1) {
//         // Toggle the isOpen state for the specific message
//         const newStates = [...prevStates];
//         newStates[index] = { postId, isOpen: !newStates[index].isOpen };
//         return newStates;
//       } else {
//         // If the state for the message doesn't exist, create a new one with isOpen set to true
//         return [...prevStates, { postId, isOpen: true }];
//       }
//     });
//   };

//   const toggleComments = (postId) => {
//     setVisibleComments((prev) => ({
//       ...prev,
//       [postId]: !prev[postId],
//     }));
//   };

//   return (
//     <>
//       {posts.map((post) => (
//         <div
//           key={post.$id}
//           role="status"
//           className="relative shadow mb-4 space-y-8 md:space-y-0 md:space-x-4 rtl:space-x-reverse md:flex md:items-center dark:bg-gray-900"
//         >

//           <button
//             onClick={() => toggleDropdown(post.$id)}
//             id={`dropdownMenuIconButton_${post.$id}`}
//             data-dropdown-toggle={`dropdownDots_${post.$id}`}
//             data-dropdown-placement="bottom-start"
//             className="absolute top-2 right-2 p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray=100 focus:ring-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
//             type="button"
//           >
//             <svg
//               className="w-4 h-4 text-gray-500 dark:text-gray-400"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 4 15"
//             >
//               <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
//             </svg>
//           </button>
//           <div
//             id={`dropdownDots_${post.$id}`}
//             className={`absolute top-8 right-2 z-10 ${
//               dropdownStates.find((state) => state.postId === post.id)?.isOpen
//                 ? "block"
//                 : "hidden"
//             } bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-900`}
//           >
//             <ul
//               className="py-2 text-sm text-gray-700 dark:text-gray-200"
//               aria-labelledby="dropdownMenuIconButton"
//             >
//               {user && post.owner.id === user.id && (
//                 <li>
//                   <a
//                     href="#"
//                     // onClick={() => handleDeletePost(post.id)}
//                     className="block px-4 py-2 text-gray-900 hover:bg-gray-300 hover:text-red-500 hover:no-underline dark:hover:bg-gray-600 dark:hover:text-gray-100"
//                   >
//                     Delete
//                   </a>
//                 </li>
//               )}
//             </ul>
//           </div>

//           <div className="custom-height sm:w-full md:w-full lg:w-full xl:w-full flex items-center justify-center bg-gray-1000 rounded  dark:bg-gray-900">
//             <img
//               className="rounded-t-lg object-cover custom-height   "
//               src={post.image_url}
//               alt={post.caption}
//             />
//           </div>
//           <div className="mt-4 mb-6 w-full pl-2">
//             <div className="flex items-center ">
//               <div className="relative">
//                 <img
//                   className="w-10 h-10 rounded-full"
//                   src={post.owner.profile_picture}
//                   alt={post.owner.username}
//                 />
//                 <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
//               </div>
//               <div className="flex flex-col mb-2">
//                 <span className="text-sm text-purple-700 font-extrabold ml-2 ">
//                   {post.owner.username}
//                 </span>
//                 <span className=" ml-4 text-xs text-gray-900 dark:text-gray-100">
//                   Location or sm
//                 </span>
//               </div>
//             </div>
//             <p className="mb-3 text-gray-900 dark:text-gray-100">
//               {post.caption}
//             </p>

//             {comments
//               .filter((comment) => comment.post_id === post.id)
//               .slice(0, visibleComments[post.id] ? comments.length : 2)
//               .map((comment) => (
//                 <div key={comment.id} role="status" className="max-w-sm ">
//                   <p className=" text-base text-gray-900 dark:text-gray-100">
//                     <a
//                       href="#"
//                       className="font-bold text-purple-700 hover:text-gray-900  dark:text-purple-700 dark:hover:text-gray-100 hover:underline"
//                     >
//                       {comment.commenter?.username}
//                     </a>
//                     {"    "}
//                     {comment.content}
//                   </p>
//                 </div>
//               ))}

//             {comments.filter((comment) => comment.post_id === post.id)
//               .length === 0 && <p className="text-gray-900 dark:text-gray-100 ">No comments yet.</p>}
//             <p
//               className="text-blue-700 cursor-pointer "
//               onClick={() => toggleComments(post.id)}
//             >
//               {visibleComments[post.id]
//                 ? "Less comments.."
//                 : "More comments..."}
//             </p>

//             <span className="sr-only">Loading...</span>
//           </div>

//         </div>
//       ))}

//     </>
//   );
// }
// export default Posts;
