import { useState,useEffect } from 'react'
import '../App.css'

function Home({user,onLogout}) {
  const [posts, setPosts] = useState([])
  const [comments,setComments]=useState([])
  const [visibleComments, setVisibleComments] = useState({})
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState(''); 
  const [newImage, setNewImage] = useState('');
  const [newComment, setNewComment] = useState('');


  useEffect(()=>{
    fetch('/posts').then(res => res.json()).then(data=>setPosts(data))
    fetch('/comments').then(res => res.json()).then(data=>setComments(data))
  },[])
  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  } 

  const toggleCreatePost = () => {
    setShowCreatePost((prev) => !prev);
    setNewPost('')
  }

  function likePost(postId) {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    )
    fetch(`/posts/{postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ posts }),
    })
    .then((res) => res.json())
    .then((data) => {
      
    });
  }

    
  function createPost() {
    if (user) {
  
      fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caption: newPost,
          image_url: newImage,
          likes: 0,
          user_id: user.id,
        }),
      })
        .then((res) => res.json())
        .then((newPostData) => {
          setPosts([newPostData, ...posts]);
          setNewPost('');
          setNewImage('');
          setShowCreatePost(false);
        });
    } else {
      alert('You need to be logged in to create a post.');
    }
  }
  
  function deletePost(postId) {
    const postToDelete = posts.find((post) => post.id === postId);

    if (user && postToDelete && user.id === postToDelete.user_id) {
      fetch(`/posts/${postId}`, {
        method: 'DELETE',
      })
        .then(() => {
          setPosts(posts.filter((post) => post.id !== postId));
        });
    } else {
    
      alert("You are not authorized to delete this post.");
    }
  }

  
   function createComment(postId, text) {
    if (user){
      fetch('/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id: postId, text }),
      })
        .then((res) => res.json())
        .then((newComment) => {
          setComments([newComment, ...comments]);
        });
    }else{
      alert('You need to be logged in to create a comment.');
    }

  }
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      onCreateComment(postId, newComment);
      setNewComment('');
    }
  };

  function deleteComment(commentId) {
    fetch(`/comments/${commentId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== commentId));
      });
  }

 

  function handleLogout() {
   fetch("/logout", {
     method: "DELETE",
   }).then(() => onLogout());
 }

return (
  
 
<>

<nav class="fixed top-0 z-50 w-full bg-violet border-b border-gray-200 dark:bg-violet-800 dark:border-gray-700">
  <div class="px-3 py-3 lg:px-5 lg:pl-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <a href="/" class="flex ml-2 md:mr-24">
          <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-black">Link Loop</span>
        </a>
      </div>
      <div class="flex items-center">
          <div class="flex items-center ml-3">
            <div>
            <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                {user && user.profile_picture_url ? (
                 <img class="w-8 h-8 rounded-full" src={user.profile_picture_url} alt="user photo"/>
                ) : (
                  <img class="w-8 h-8 rounded-full" src="https://i.pinimg.com/236x/1e/d3/d3/1ed3d3ede778506de6edade417cce3e0.jpg" alt="user photo"/>
                )}
                
              </button>
            </div>
            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user" data-popper-placement='bottom'>
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                {user && user.profile_picture_url ? (
                  user.username
                ) : (
                  "username"
                )}
                  
                </p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                {user && user.profile_picture_url ? (
                    user.email
                  ) : (
                    "email"
                  )}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a href="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Home</a>
                </li>
              
                <li onClick={handleLogout}>
                  <a href="/login"  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">log in</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>

<aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium bg-blue">
         <li>
         <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-black">Home</h2>
         
         </li>
         <li onClick={toggleCreatePost}>
            <a href="/" class="flex items-center p-2 bg-violet dark:bg-violet-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12V1m0 0L4 5m4-4 4 4m3 5v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
              </svg>
               <span class="flex-1 ml-3 whitespace-nowrap text-black">{showCreatePost ? 'Cancel' : 'Create Post'}</span>
            </a>
         </li>
         <li>
            <a href="/messaging" class="flex items-center p-2 bg-violet dark:bg-violet-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg>
               <span class="flex-1 ml-3 whitespace-nowrap text-black">Inbox</span>
            </a>
         </li>
         <li>
            <a href="/about" class="flex items-center p-2 bg-violet dark:bg-violet-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
               <path d="M9 7V2.13a2.98 2.98 0 0 0-1.293.749L4.879 5.707A2.98 2.98 0 0 0 4.13 7H9Z"/>
               <path d="M18.066 2H11v5a2 2 0 0 1-2 2H4v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 20 20V4a1.97 1.97 0 0 0-1.934-2ZM10 18a1 1 0 1 1-2 0v-2a1 1 0 1 1 2 0v2Zm3 0a1 1 0 0 1-2 0v-6a1 1 0 1 1 2 0v6Zm3 0a1 1 0 0 1-2 0v-4a1 1 0 1 1 2 0v4Z"/>
            </svg>
               <span class="flex-1 ml-3 whitespace-nowrap text-black">About Us</span>
            </a>
         </li>
         <li>
            <a href="/contact" class="flex items-center p-2 bg-violet dark:bg-violet-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
              <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"/>
            </svg>
               <span class="flex-1 ml-3 whitespace-nowrap text-black">Contact Us</span>
            </a>
         </li>
         <li>
            <a href="/" class="flex items-center p-2 bg-violet dark:bg-violet-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
               <span class="flex-1 ml-3 whitespace-nowrap text-black">Log In</span>
            </a>
         </li>
         <li>
            <a href="/signup" class="flex items-center p-2 bg-violet dark:bg-violet-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>
               <span class="flex-1 ml-3 whitespace-nowrap text-black">Sign Up</span>
            </a>
         </li>
         <li onClick={handleLogout}>
            <a href="/login" class="flex items-center p-2 bg-violet dark:bg-violet-800 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg class="w-5 h-5 text-gray-800 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
            </svg>
               <span class="flex-1 ml-3 whitespace-nowrap text-black">Log Out</span>
            </a>
         </li>
      </ul>
   </div>
</aside>





<div class="p-4 sm:ml-64 mt-16">
   <div class="p-1  border-0 border-gray-200 border-solid rounded-lg dark:border-gray-700 ">
   {showCreatePost && (
  <section class="bg-violet mt-10 dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Post</h2>
      <form action="/">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            
          <div class="mb-6">
    <label for="image_url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url</label>
    <input onChange={(e) => setNewImage(e.target.value)} value={newImage} type="text" id="image_url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
       <div>
       <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
              <textarea onChange={(e) => setNewPost(e.target.value)} value={newPost} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
       </div>
         


          </div>
          <button onClick={createPost} type="button" class="inline-flex items-left px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-violet-800 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-800">
              Add Post
          </button>
      </form>
  </div>
</section>
)}


   <div id="post_container">
    {posts.map((post) => (
      <div
        key={post.id}
        className="custom-max-width mb-5 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex">
          <div className="w-1/3">
              <img
                className="rounded-t-lg object-cover  w-full h-full"
                src={post.image_url}
                alt={post.caption}
              />
          </div>
          <div className="w-1/2">
            <div className="post-details">
              <div className="post-user-info">
                <img
                  src={post.user.profile_picture_url}
                  alt={post.user.username}
                />
                <span>{post.user.username}</span>
              </div>
              <div className="post-caption">{post.caption}</div>
              <div className="post-likes">

                <button onClick={() => likePost(post.id)}>
                <svg class="w-5 h-5 text-red-800 dark:text-red" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                 <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"/>
              </svg>
                  {post.likes}</button>
              </div>
              <div className="post-comments">
                <div className="comments-title">comments:</div>
                {comments
                  .filter((comment) => comment.post_id === post.id)
                  .slice(0, visibleComments[post.id] ? comments.length : 3)
                  .map((comment) => (
                    <div key={comment.id} className="comment">
                      <span>{comment.user.username}</span>
                      {comment.text}
                      <button type="button"  onClick={() => deleteComment(comment.id)} class="text-red-700 hover:text-white  border-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-1 py-0.5 text-center m-5 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Delete</button>
                    </div>
                  ))}
              </div>
              <button onClick={() => toggleComments(post.id)}>
                {visibleComments[post.id] ? 'Hide comments..' : 'More comments...'}
              </button>


<form>
   <div class="w-full mb-4 border-0 border-black rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-black">
       <div class="px-4 py-2 bg-white  dark:bg-gray-800">
           <label for="comment" class="sr-only">Your comment</label>
           <textarea id="comment" rows="4" class="w-full px-0 text-sm text-black-900 bg-white  dark:bg-gray-800 focus:ring-0 dark:text-black dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
       </div>
       <div class="flex items-center justify-between px-3 py-2 bg-white border-t dark:border-gray-600">
           <button type="button" onClick={()=> createComment(post.id)} class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Post comment
           </button>
          </div>
          </div>
</form>
              
              <div className="post-date">
                <span>{post.created_at}</span>
              </div>
              {user && user.id === post.user_id && (
            <button
              type="button"
              onClick={() => deletePost(post.id)}
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-2 py-1.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete post
            </button>
          )}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  </div>
</div>

</>
);
}

export default Home
