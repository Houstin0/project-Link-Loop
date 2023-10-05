import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [posts, setPosts] = useState([])
  const [users,setUsers]=useState([])
  const [messages,setMessages]=useState([])
  const [comments,setComments]=useState([])
  const [visibleComments, setVisibleComments] = useState({})

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }



  useEffect(()=>{
    fetch('api/users').then(res => res.json()).then(data=>setUsers(data))
    fetch('/api/posts').then(res => res.json()).then(data=>setPosts(data))
    fetch('api/messages').then(res => res.json()).then(data=>setMessages(data))
    fetch('api/comments').then(res => res.json()).then(data=>setComments(data))
  },[])

  return (
    <>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <img src={post.image_url} alt={post.caption} />
            <div className="post-details">
              <div className="post-user-info">
                <img src={post.user.profile_picture_url} alt={post.user.username} />
                <span>{post.user.username}</span>
              </div>
              <div className="post-caption">{post.caption}</div>
              <div className="post-likes">
                <span>{post.likes} likes</span>
              </div>
              <div className="post-comments">
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
                {visibleComments[post.id] ? 'Hide Comments' : 'Show More Comments'}
              </button>
              <div className='post-date'>
                <span>{post.created_at}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
