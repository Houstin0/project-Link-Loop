import { useState,useEffect } from 'react'
import '../App.css'
import Posts from './Posts';
import UserList from './UserList';

function Home({user,onLogout}) {
 

  function handleLogout() {
   fetch("/logout", {
     method: "DELETE",
   }).then(() => onLogout());
 }

return (
  
 
<div id='homeContainer'>
   <UserList  user={user}/>

 <Posts user={user}/>




</div>
)
}

export default Home
