import { useState,useEffect } from 'react'
import '../App.css'

function Home() {
  const [posts, setPosts] = useState([])
  const [comments,setComments]=useState([])
  const [visibleComments, setVisibleComments] = useState({})

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }
  useEffect(()=>{
    fetch('/api/posts').then(res => res.json()).then(data=>setPosts(data))
    fetch('api/comments').then(res => res.json()).then(data=>setComments(data))
  },[])

return (
  <div id="post_container">
    {posts.map((post) => (
      <div
        key={post.id}
        className="custom-max-width p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="flex">
          <div className="w-1/2">
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
                <span>{post.likes} likes</span>
              </div>
              <div className="post-comments">
                <div className="comments-title">comments:</div>
                {comments
                  .filter((comment) => comment.post_id === post.id)
                  .slice(0, visibleComments[post.id] ? comments.length : 3)
                  .map((comment) => (
                    <div key={comment.id} className="comment">
                      <span>{comment.user.username}</span>
                      <span>{comment.text}</span>
                    </div>
                  ))}
              </div>
              <button onClick={() => toggleComments(post.id)}>
                {visibleComments[post.id] ? 'Hide comments..' : 'More comments...'}
              </button>
              <div className="post-date">
                <span>{post.created_at}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
}

export default Home
