import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [posts, setPosts] = useState([])
  const [users,setUsers]=useState([])
  const [messages,setMessages]=useState([])
  const [comments,setComments]=useState([])

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
                {comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <span>{comment.user.username}</span>
                    <span>{comment.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
