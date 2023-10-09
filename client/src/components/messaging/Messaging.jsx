import React, { useEffect, useState } from "react";
import Search from "./Search";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";


function Messaging({currentUser}) {
  const [recipientId, setRecipientId] = useState(null);
  const [recipients,setRecipients]=useState([])
  const [messages,setMessages]=useState([])

  const loadMessages = ()=>{
    fetch('api//messages?sender_id=${user.id}&recipient_id=${recipientId}')
    .then(r=>r.json())
    .then(data=>setMessages(data))
    .catch((error)=>{
      console.log('Error loading messages:', error)
    })
  }

  useEffect(()=>{
    fetch('api/users_with_messages')
    .then(r=>r.json())
    .then(data=>setRecipients(data))
    loadMessages()
   },[])
  

  return (
<>
<aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
         <li>
    
         <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-black">Inbox</h2>
            
         </li>
         {recipients.map((recipient)=>( 
          <li key={recipient.id}onClick={()=>setRecipientId(recipient.id)}>
            <a href="#"  className="flex items-center p-2 bg-violet dark:bg-violet-800 text-gray-900 rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <div>
              <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src={recipient.profile_picture_url} alt="user photo"/>
              </button>
            </div>
              <span class="flex-1 ml-3 whitespace-nowrap">{recipient.username}</span>
              </a>
          </li>
         ))}
         
      </ul>
   </div>
</aside>
<div id="coversations">
   
    
      {recipientId && <MessageList user={currentUser} recipientId={recipientId} loadMessages={loadMessages} messages={messages} />}
    </div>



</>

  );

}

export default Messaging;


   {/* <h1>Welcome, {currentUser.username}!</h1> */}
