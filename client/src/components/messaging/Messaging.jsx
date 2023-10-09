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
{/* <nav className="fixed top-0 z-50 w-full bg-violet border-b border-gray-200 dark:bg-violet-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <a href="/" class="flex ml-2 md:mr-24">
          <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Link Loop</span>
        </a>
      </div>
      <div class="flex items-center">
          <div class="flex items-center ml-3">
            <div>
              <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src={currentUser.profile_picture_url} alt="user photo"/>
              </button>
            </div>
            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  {currentUser.username}
                </p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                 {currentUser.email}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a href="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Home</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                </li>
                <li>
                  <a href="/logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Log out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav> */}

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
      <h1>Welcome, {currentUser.username}!</h1>
    
      {recipientId && <MessageList user={currentUser} recipientId={recipientId} loadMessages={loadMessages} messages={messages} />}
    </div>



</>

  );

}

export default Messaging;
