import { useState,useEffect } from 'react'
import '../App.css'

function Posts({user}){

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

 

  return(
    <>
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
          </div>
          </div>
       
 <div id="post_container">
      {posts.map((post) => (
        <div key={post.id}
          className="custom-max-width mb-5 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex">
                <div className="custom-height">
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
                              
                                <p className="comment-username">{comment.user.username}:</p>
                                <p className="comment-text">{comment.text}</p>
                      
                                {user && user.id === comment.user.id && (
                                  <button
                                    type="button"
                                    onClick={() => deleteComment(comment.id)}
                                    className="delete-comment-button"
                                  >
                                    Delete
                                  </button>)}
                          </div>))}
                          {comments
                            .filter((comment) => comment.post_id === post.id)
                            .length === 0 && (
                            <p>No comments yet.</p>
                          )}
                          <button onClick={() => toggleComments(post.id)}>
                  {visibleComments[post.id] ? 'Hide comments..' : 'More comments...'}
                </button>       
                </div>



     {user && (<form onSubmit={()=> createComment(post.id)}>
      <div class="w-full mb-4 border-0 border-black rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-black">
          <div class="px-4 py-2 bg-white  dark:bg-gray-800">
              <label for="comment" class="sr-only">Your comment</label>
              <textarea id="comment" rows="4" class="w-full px-0 text-sm text-black-900 bg-white  dark:bg-gray-800 focus:ring-0 dark:text-black dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
          </div>
          <div class="flex items-center justify-between px-3 py-2 bg-white border-t dark:border-gray-600">
              <button type="button" onClick={()=> createComment(post.id)} class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-violet-800 rounded-lg focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900 hover:bg-violet-800">
                  Post comment
              </button>
            </div>
            </div>
      </form>)}
                
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
</>
)
}
export default Posts