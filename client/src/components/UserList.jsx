import React, { useState,useEffect } from 'react';

function UserList({user}) {
    const [isFollowing, setIsFollowing] = useState(false)
    const [userList, setUserList] = useState([])
    useEffect(() => {
        // Fetch the list of users and their follower counts from your API
        fetch('/users/followers')
        .then(response=>response.json())
        .then((data)=>setUserList(data))
        // Update the userList state with the fetched data
      }, []);

    // const handleFollow = (userId) => {
    //     if (user){
    //     // Make an API request to add a follower
    //             fetch('/users/followers',{
    //                 method: 'POST',
    //                 headers: {
    //                 'Content-Type': 'application/json',
    //                 // You may need to include an authentication token here if required
    //                 },
    //                 // You can include a request body if needed
    //                 body: JSON.stringify({follow_id: userId}),
    //             })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 // Handle the success case
    //                 setIsFollowing(true);
    //                 console.log(data);
    //             })
    //             .catch((error) => {
    //                 // Handle the error case
    //                 console.error(`Error following user: ${error.message}`);
    //                 // Handle any error and provide user feedback as needed
    //             })}
    //     else{
    //         console.log("you need to be logged in")
    //     }            
//   };



  return (
    <div>
      <h2>User List</h2>
      <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium bg-blue">
         <li>
         <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-black">Home</h2>
         
         </li>
         {/* <li onClick={toggleCreatePost}>
            <a href="/" class="flex items-center p-2 bg-violet dark:bg-violet-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12V1m0 0L4 5m4-4 4 4m3 5v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
              </svg>
               <span class="flex-1 ml-3 whitespace-nowrap text-black">{showCreatePost ? 'Cancel' : 'Create Post'}</span>
            </a>
         </li> */}
         {userList.map((user) => (
         <li key={user.id}>
            <a href=" " class="flex items-center p-2 bg-violet dark:bg-violet-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <img class="w-5 h-5 rounded" src={user.profile_picture_url} />
               <span class="flex-1 ml-3 whitespace-nowrap text-black">{user.username}</span>
            </a>
         </li>))}
      </ul>
   </div>
</aside>

    
            {/* <div>Followers: {user.follower_count}</div> */}
            {/* <button onClick={handleFollow(user.id)} disabled={isFollowing}>
                {isFollowing ? 'Following' : 'Follow'}
              </button> */}
 
    
    
    </div>
  );
}

export default UserList;