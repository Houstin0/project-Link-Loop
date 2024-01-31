import React, { useState } from "react";
import Cookies from "js-cookie";

function CreatePostForm({ user }) {
  const [newImage, setNewImage] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [file, setFile] = useState("");

  const handleCreatePost = (e) => {
    e.preventDefault();

    if (user) {
      fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify({
          caption: newCaption,
          image_url: newImage,
          owner_id: user.id,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          
          setNewCaption("");
          setNewImage("");
        });
    } else {
      alert("You need to be logged in to create a post.");
    }
  };

  return (
    <form class="max-w-sm mx-auto mb-5 mt-10">
    <div class="mb-5">
  
    
  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
  <input id="file_input" type="file" accept="image/*" onChange={ (e) => setFile(e.target.files[0])} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" />
  <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
  
  
  <label for="image_url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url</label>  
  <input onChange={(e) => setNewImage(e.target.value)} value={newImage} type="text" id="image_url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  
  
    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Caption</label>
    <textarea id="message" onChange={(e) => setNewCaption(e.target.value)} value={newCaption} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Caption..."></textarea>
  
  
  
    </div>
    <button type="submit" onClick={handleCreatePost} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </form>
  );
}

export default CreatePostForm;
